import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import Decimal from "decimal.js";
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

// numberをリストで受け取って全て加算した結果を返す
server.tool(
	"sum_numbers",
	"数値リストをすべて足し合わせて合計値を返す（例: 以下を全部加算してください、これらの数の合計を教えてください、以下を合計してください、以下の合計は？など）",
	{
		numbers: z.array(
			z.preprocess(
				(val) => (typeof val === "string" ? Number.parseFloat(val) : val),
				z.number(),
			),
		),
	},
	async ({ numbers }) => {
		const sum = numbers.reduce((acc, num) => acc.plus(num), new Decimal(0));
		return {
			content: [{ type: "text", text: `合計: ${sum.toString()}` }],
		};
	},
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
(async () => {
	await server.connect(transport);
})();
