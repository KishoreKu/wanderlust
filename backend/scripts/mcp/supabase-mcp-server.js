#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const {
  McpServer,
  ResourceTemplate,
} = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const server = new McpServer({
  name: 'gubbu-supabase-mcp',
  version: '1.0.0',
});

server.tool(
  'supabase.query',
  {
    table: { type: 'string', description: 'Supabase table name.' },
    select: { type: 'string', description: 'Select clause (default: *).' },
    filters: {
      type: 'array',
      description: 'Array of filters: { column, operator, value }',
      items: {
        type: 'object',
        properties: {
          column: { type: 'string' },
          operator: { type: 'string' },
          value: {},
        },
        required: ['column', 'operator', 'value'],
      },
    },
    limit: { type: 'number', description: 'Limit rows.' },
    order: {
      type: 'object',
      description: 'Order: { column, ascending }',
      properties: {
        column: { type: 'string' },
        ascending: { type: 'boolean' },
      },
    },
  },
  async ({ table, select = '*', filters = [], limit, order }) => {
    let query = supabase.from(table).select(select);
    for (const filter of filters) {
      query = query[filter.operator](filter.column, filter.value);
    }
    if (order && order.column) {
      query = query.order(order.column, { ascending: order.ascending ?? true });
    }
    if (limit) {
      query = query.limit(limit);
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return { data };
  }
);

server.tool(
  'supabase.insert',
  {
    table: { type: 'string', description: 'Supabase table name.' },
    rows: {
      type: 'array',
      description: 'Array of rows to insert.',
      items: { type: 'object' },
    },
  },
  async ({ table, rows }) => {
    const { data, error } = await supabase.from(table).insert(rows).select('*');
    if (error) throw new Error(error.message);
    return { data };
  }
);

server.tool(
  'supabase.update',
  {
    table: { type: 'string', description: 'Supabase table name.' },
    values: { type: 'object', description: 'Values to update.' },
    filters: {
      type: 'array',
      description: 'Array of filters: { column, operator, value }',
      items: {
        type: 'object',
        properties: {
          column: { type: 'string' },
          operator: { type: 'string' },
          value: {},
        },
        required: ['column', 'operator', 'value'],
      },
    },
  },
  async ({ table, values, filters = [] }) => {
    let query = supabase.from(table).update(values);
    for (const filter of filters) {
      query = query[filter.operator](filter.column, filter.value);
    }
    const { data, error } = await query.select('*');
    if (error) throw new Error(error.message);
    return { data };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
