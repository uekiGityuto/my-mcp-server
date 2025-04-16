import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { generateUUID, generateUUIDs } from "./utils/uuidGenerator";

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

server.tool(
	"generate_uuids",
	"指定された数のUUIDを生成する",
	{ count: z.number().min(1).max(100) },
	async ({ count }) => {
		const uuids = generateUUIDs(count);
		return {
			content: [{ type: "text", text: uuids.join("\n") }],
		};
	},
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
(async () => {
	await server.connect(transport);
})();
