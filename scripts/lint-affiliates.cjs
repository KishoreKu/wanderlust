const fs = require("fs");
const path = require("path");

const contentDir = path.join(process.cwd(), "src", "content");

const allowedCanonical = [
  /^https?:\/\/api\.gubbu\.io\/go\//i,
  /^https?:\/\/gubbu\.io\/go\//i,
];

// Add exceptions for approved non-commercial references.
const allowedExternal = [];

const disallowedInternalCta =
  /^https?:\/\/gubbu\.io\/(flights|hotels|activities|klook)(\/|$)/i;

const affiliateParam = /(affid=|affiliate|utm_source=affiliate|ref=|tag=)/i;

const htmlLinkRegex = /<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
const mdLinkRegex = /\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/gi;

const isCanonical = (url) => allowedCanonical.some((re) => re.test(url));
const isAllowedExternal = (url) =>
  allowedExternal.some((rule) =>
    rule instanceof RegExp ? rule.test(url) : url.startsWith(rule)
  );
const isInternal = (url) => /^https?:\/\/(api\.)?gubbu\.io(\/|$)/i.test(url);

const checkUrl = (url) => {
  if (isCanonical(url)) return null;
  if (disallowedInternalCta.test(url)) {
    return "CTA must route through canonical /go/*";
  }
  if (affiliateParam.test(url)) {
    return "Raw affiliate URL not allowed";
  }
  if (!isInternal(url) && !isAllowedExternal(url)) {
    return "External outbound link not allowed; use /go/* or plain text";
  }
  return null;
};

const getLineUrls = (line) => {
  const urls = [];
  let match = null;

  while ((match = htmlLinkRegex.exec(line))) {
    urls.push(match[1]);
  }
  htmlLinkRegex.lastIndex = 0;

  while ((match = mdLinkRegex.exec(line))) {
    urls.push(match[1]);
  }
  mdLinkRegex.lastIndex = 0;

  return urls;
};

const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => path.join(contentDir, file));

const violations = new Map();

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const fileIssues = [];

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const urls = getLineUrls(line);

    urls.forEach((url) => {
      const reason = checkUrl(url);
      if (reason) {
        fileIssues.push({
          line: lineNumber,
          reason,
          url,
        });
      }
    });
  });

  if (fileIssues.length > 0) {
    violations.set(filePath, fileIssues);
  }
}

const total = files.length;
const failed = violations.size;
const passed = total - failed;

console.log(`✅ PASS: ${passed} posts`);
console.log(`❌ FAIL: ${failed} posts`);

if (failed > 0) {
  for (const [filePath, issues] of violations.entries()) {
    console.log(filePath);
    issues.forEach((issue) => {
      console.log(
        `  line: ${issue.line} - ${issue.reason} - ${issue.url}`
      );
    });
  }
  process.exitCode = 1;
}
