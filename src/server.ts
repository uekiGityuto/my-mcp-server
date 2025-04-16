import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { generateUUID } from "./utils/uuidGenerator";

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

server.tool("generate_uuid", "UUIDを生成する", {}, async () => ({
  content: [{ type: "text", text: generateUUID() }],
}));

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();
