const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BLOG_CONTENT_DIR =
  process.env.CITY_BLOG_CONTENT_DIR || process.env.BLOG_CONTENT_DIR || "";
const BLOG_BASE_URL = process.env.BLOG_BASE_URL || "https://api.gubbu.io";

const DEFAULT_SOURCE = "blog";
const DEFAULT_ADULTS = "2";
const DEFAULT_LIMIT = 2;

const categoryConfig = {
  flights: {
    title: "Flights",
    intro: "Compare flight options that align with your timing and comfort.",
    ctaLabel: "Search flights",
    baseParams: (city, country) => ({ city, country, source: DEFAULT_SOURCE }),
  },
  hotels: {
    title: "Hotels",
    intro: "Find stays that match your pace and priorities. Dates are set on partner sites.",
    ctaLabel: "Explore hotels",
    baseParams: (city, country) => ({
      city,
      country,
      adults: DEFAULT_ADULTS,
      source: DEFAULT_SOURCE,
    }),
  },
  activities: {
    title: "Things to do",
    intro: "Pick experiences that fit your energy level and interests.",
    ctaLabel: "Discover activities",
    baseParams: (city, country) => ({ city, country, source: DEFAULT_SOURCE }),
  },
  cars: {
    title: "Car rentals",
    intro: "If flexibility matters, compare rentals for airport or city pickup.",
    ctaLabel: "Compare car rentals",
    baseParams: (city, country) => ({ city, country, source: DEFAULT_SOURCE }),
  },
  pet: {
    title: "Pet care essentials",
    intro: "Stock the right supplies so your pet stays calm and healthy on the move.",
    ctaLabel: "Browse pet essentials",
    baseParams: (city, country) => ({
      query: `${city} pet travel essentials`,
      source: DEFAULT_SOURCE,
    }),
  },
  lifestyle: {
    title: "Lifestyle essentials",
    intro: "Gear and tools that make the trip smoother.",
    ctaLabel: "See lifestyle picks",
    baseParams: (city, country) => ({
      query: `${city} travel essentials`,
      source: DEFAULT_SOURCE,
    }),
  },
  wfa: {
    title: "Work from anywhere",
    intro: "Choose spaces and routines that keep you productive.",
    ctaLabel: "Plan work-from-anywhere",
    baseParams: (city, country) => ({ city, country, source: DEFAULT_SOURCE }),
  },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.replace(/^--/, "");
    const value = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true;
    result[key] = value;
  }
  return result;
}

function requireEnv() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }
  if (!BLOG_CONTENT_DIR) {
    throw new Error("Missing CITY_BLOG_CONTENT_DIR or BLOG_CONTENT_DIR.");
  }
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildFrontmatter({ city, country, slug, description, tags, image }) {
  const date = new Date().toISOString().slice(0, 10);
  const title = `${city} Travel Guide: Flights, Hotels, Activities + Essentials`;
  const lines = [
    "---",
    `title: "${title}"`,
    `description: "${description}"`,
    `category: "Destinations"`,
    `tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]`,
    "featured: false",
    'author: "Gubbu Team"',
    `date: "${date}"`,
    `image: "${image}"`,
    "---",
    "",
  ];
  return lines.join("\n");
}

function buildCtaUrl(endpoint, params) {
  const url = new URL(endpoint, BLOG_BASE_URL);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

function buildCategorySection(category, data) {
  const config = categoryConfig[category];
  if (!config) return "";
  const { partner, ctaUrl } = data;
  return [
    `## ${config.title}`,
    "",
    config.intro,
    "",
    `**Best option:** ${partner.name}`,
    "",
    `[${config.ctaLabel}](${ctaUrl})`,
    "",
  ].join("\n");
}

function buildDisclosure() {
  return [
    "### Disclosure",
    "",
    "Some links on this page are affiliate links. If you choose to use them, we may earn a commission at no extra cost to you.",
    "",
  ].join("\n");
}

function buildSafetyBlock() {
  return [
    "## Safety & Essentials",
    "",
    "Plan for peace of mind, especially if this is your first visit.",
    "",
    "### Healthcare & Hospitals",
    "If you need medical care while traveling, prioritize reputable hospitals and know where urgent care clinics are located. This is informational only, not medical advice.",
    "",
    "**Major hospitals**",
    "- **Hospital Name** — location or specialty note",
    "- **Hospital Name** — location or specialty note",
    "",
    "**Urgent care vs emergency**",
    "- **Urgent care:** minor injuries, infections, non-life-threatening issues",
    "- **Emergency:** severe pain, breathing issues, serious accidents",
    "",
    "### Local Safety Tips",
    "- Save the local emergency number in your phone",
    "- Keep your accommodation address handy",
    "- Avoid isolated areas late at night in unfamiliar neighborhoods",
    "",
    "### Travel Protection Reminder",
    "If you plan outdoor activities or longer stays, consider reviewing travel protection options before you arrive.",
    "",
    "**Disclosure:** Gubbu provides educational information only and does not provide medical advice or referrals.",
    "",
  ].join("\n");
}

function buildEventBlock(events) {
  if (!events.length) return "";
  const lines = [
    "## Seasonal highlights",
    "",
    "If you are planning around special dates, here are nearby events to keep in mind:",
    "",
  ];
  events.forEach((event) => {
    const timing = event.season || event.start_date || "Upcoming";
    lines.push(`- **${event.name}** — ${timing}`);
  });
  lines.push("", "");
  return lines.join("\n");
}

function buildIntro(city, country) {
  return [
    `# ${city} Decision Guide`,
    "",
    `${city}, ${country} can feel overwhelming to plan. This guide keeps decisions clear and routes you to trusted options without the noise.`,
    "",
    "Use the sections below to choose flights, stays, experiences, and essentials. Every action routes through Gubbu’s centralized partner system.",
    "",
  ].join("\n");
}

function buildQuickTable(sections) {
  const lines = [
    "## Quick decision table",
    "",
    "| Category | Best option |",
    "| --- | --- |",
  ];
  sections.forEach(({ category, partner }) => {
    const title = categoryConfig[category]?.title || category;
    lines.push(`| ${title} | ${partner.name} |`);
  });
  lines.push("", "");
  return lines.join("\n");
}

async function fetchPartners(supabase, city, country) {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("active", true);
  if (error) throw error;

  return (data || []).filter((partner) => {
    if (partner.supports_city === false && city) return false;
    if (partner.supports_country === false && country) return false;
    if (Array.isArray(partner.regions) && partner.regions.length) {
      const region = String(country || "").toUpperCase();
      if (!partner.regions.includes("GLOBAL") && region && !partner.regions.includes(region)) {
        return false;
      }
    }
    return true;
  });
}

async function fetchEvents(supabase, city, country) {
  const { data, error } = await supabase
    .from("city_events")
    .select("*")
    .ilike("city", city)
    .limit(3);
  if (error) throw error;
  return (data || []).filter((event) => {
    if (country && event.country && event.country.toLowerCase() !== country.toLowerCase()) return false;
    return true;
  });
}

function pickPartnersByCategory(partners) {
  const grouped = {};
  partners.forEach((partner) => {
    const category = String(partner.category || "").toLowerCase();
    if (!category) return;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(partner);
  });

  const selected = Object.entries(grouped).map(([category, list]) => {
    const sorted = list.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    return { category, partner: sorted[0] };
  });

  return selected.sort((a, b) => (b.partner.priority || 0) - (a.partner.priority || 0));
}

function buildCategoryData(city, country, selection) {
  return selection.map(({ category, partner }) => {
    const config = categoryConfig[category];
    if (!config) return null;
    const baseParams = config.baseParams(city, country);
    const mergedParams = Object.assign({}, baseParams, partner.default_params || {});
    const ctaUrl = buildCtaUrl(partner.go_endpoint, mergedParams);
    return { category, partner, ctaUrl };
  }).filter(Boolean);
}

function buildDescription(city, country, categories) {
  const categoryNames = categories
    .map((cat) => categoryConfig[cat]?.title || cat)
    .slice(0, 4)
    .join(", ");
  return `Plan ${city}, ${country} with decision-first guidance for ${categoryNames} and essential planning tips.`;
}

function buildTags(city, country, categories) {
  const tags = new Set(["travel", "decisions", city, country]);
  categories.forEach((cat) => tags.add(cat));
  return Array.from(tags).filter(Boolean);
}

function buildImage(city) {
  return `/images/cities/${slugify(city)}.jpg`;
}

function writeMarkdown({ slug, content, overwrite }) {
  const filename = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
  if (!overwrite && fs.existsSync(filename)) {
    throw new Error(`File already exists: ${filename}`);
  }
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content, "utf8");
  return filename;
}

async function generateCity({ city, country, overwrite }) {
  if (!city || !country) {
    throw new Error("City and country are required.");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const partners = await fetchPartners(supabase, city, country);
  const selected = pickPartnersByCategory(partners);
  const categories = selected.map((item) => item.category);
  const categoryData = buildCategoryData(city, country, selected);
  const events = await fetchEvents(supabase, city, country);

  const slug = slugify(`${city}-${country}`);
  const description = buildDescription(city, country, categories);
  const tags = buildTags(city, country, categories);
  const image = buildImage(city);

  const frontmatter = buildFrontmatter({ city, country, slug, description, tags, image });
  const intro = buildIntro(city, country);
  const quickTable = buildQuickTable(categoryData);
  const sections = categoryData.map((item) => buildCategorySection(item.category, item)).join("\n");
  const eventBlock = buildEventBlock(events);
  const safetyBlock = buildSafetyBlock();
  const disclosure = buildDisclosure();

  const content = `${frontmatter}${intro}${quickTable}${sections}${eventBlock}${safetyBlock}${disclosure}`;
  const output = writeMarkdown({ slug, content, overwrite });

  return { slug, output };
}

async function processQueue(limit) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("city_queue")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_date", today)
    .order("priority", { ascending: false })
    .order("scheduled_date", { ascending: true })
    .limit(limit);

  if (error) throw error;
  const queue = data || [];

  for (const entry of queue) {
    try {
      const result = await generateCity({
        city: entry.city,
        country: entry.country,
        overwrite: false,
      });
      await supabase
        .from("city_queue")
        .update({ status: "generated", last_error: null })
        .eq("id", entry.id);
      console.log(`Generated: ${result.slug}`);
    } catch (err) {
      await supabase
        .from("city_queue")
        .update({ status: "failed", last_error: err.message })
        .eq("id", entry.id);
      console.error(`Failed ${entry.city}, ${entry.country}: ${err.message}`);
    }
  }
}

async function main() {
  requireEnv();
  const args = parseArgs();

  if (args.queue) {
    const limit = Number(args.limit || DEFAULT_LIMIT);
    await processQueue(limit);
    return;
  }

  const city = args.city;
  const country = args.country;
  const overwrite = Boolean(args.overwrite);
  const result = await generateCity({ city, country, overwrite });
  console.log(`Generated ${result.slug} at ${result.output}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
