import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  _version: "1.0.0",
  get version() {
    return this._version;
  },
  set version(value) {
    this._version = value;
  },
});

// Add an addition tool
server.tool(
  "add",
  "与えられた数値の足し算をする",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

server.tool("uuid_generator", "UUIDを生成する", {}, async () => ({
  content: [{ type: "text", text: uuidv4() }],
}));

// // Add a dynamic greeting resource
// server.resource(
//   "greeting",
//   new ResourceTemplate("greeting://{name}", { list: undefined }),
//   async (uri, { name }) => ({
//     contents: [{
//       uri: uri.href,
//       text: `Hello, ${name}!`
//     }]
//   })
// );

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
