require('dotenv').config();
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { z } = require("zod");
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');

// Initialize Twitter client
const twitterClient = process.env.TWITTER_API_KEY ? new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
}) : null;

const server = new Server(
  {
    name: "gubbu-social-manager",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "post_to_twitter",
        description: "Post a short update or tweet to Twitter/X",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The content of the tweet (max 280 characters)",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "post_to_linkedin",
        description: "Post a professional update to LinkedIn",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The main text of the post",
            },
            title: {
              type: "string",
              description: "Title for the shared content",
            },
            url: {
              type: "string",
              description: "URL to share with the post",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

/**
 * Handle tool execution.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "post_to_twitter") {
      if (!twitterClient) {
        throw new Error("Twitter API keys not configured in .env");
      }
      const { text } = z.object({ text: z.string().max(280) }).parse(args);
      const { data: createdTweet } = await twitterClient.v2.tweet(text);
      return {
        content: [{ type: "text", text: `Successfully posted tweet: ${createdTweet.text} (ID: ${createdTweet.id})` }],
      };
    }

    if (name === "post_to_linkedin") {
      // Placeholder for LinkedIn implementation (requires OAuth token)
      const { text, title, url } = z.object({
        text: z.string(),
        title: z.string().optional(),
        url: z.string().url().optional()
      }).parse(args);
      
      return {
        content: [{ type: "text", text: `[SIMULATION] LinkedIn post drafted:\nText: ${text}\nLink: ${url || 'None'}\n\nNote: To enable real posting, add your LinkedIn Member ID and Access Token to .env.` }],
      };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

/**
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Gubbu Social MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
