import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { describe, expect, it } from "vitest";

describe("MCP Server", () => {
	it("should generate a valid UUID using the generate_uuid tool", async () => {
		// Create client transport and client instance
		const clientTransport = new StdioClientTransport({
			command: "ts-node",
			args: ["./src/server.ts"], // 実際のサーバーファイルを指定
		});

		const client = new Client({
			name: "test-client",
			version: "1.0.0",
		});

		// Connect the client
		await client.connect(clientTransport);

		try {
			// Call the generate_uuid tool with appropriate arguments
			const result = await client.callTool({
				name: "generate_uuid",
				arguments: {}, // Pass an empty object if no arguments are required
			});

			// Validate the result
			const content = result.content as Array<{ type: string; text: string }>;
			console.log("Result content:", content);
			expect(content[0].text).toMatch(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
			);
		} finally {
			// Ensure the client transport is properly closed
			await clientTransport.close(); // Use `close` instead of `disconnect` if available
		}
	});

	it("should generate multiple UUIDs using the generate_uuids tool", async () => {
		// Create client transport and client instance
		const clientTransport = new StdioClientTransport({
			command: "ts-node",
			args: ["./src/server.ts"], // 実際のサーバーファイルを指定
		});

		const client = new Client({
			name: "test-client",
			version: "1.0.0",
		});

		// Connect the client
		await client.connect(clientTransport);

		try {
			// Call the generate_uuids tool with a valid count
			const count = 5;
			const result = await client.callTool({
				name: "generate_uuids",
				arguments: { count },
			});

			// Validate the result
			const content = result.content as Array<{ type: string; text: string }>;
			const uuids = content[0].text.split("\n");

			// Check the number of UUIDs generated
			expect(uuids).toHaveLength(count);

			// Validate each UUID format
			for (const uuid of uuids) {
				expect(uuid).toMatch(
					/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
				);
			}
		} finally {
			// Ensure the client transport is properly closed
			await clientTransport.close(); // Use `close` instead of `disconnect` if available
		}
	});

	it("should sum numbers using the sum_numbers tool", async () => {
		const clientTransport = new StdioClientTransport({
			command: "ts-node",
			args: ["./src/server.ts"],
		});

		const client = new Client({
			name: "test-client",
			version: "1.0.0",
		});
		await client.connect(clientTransport);

		try {
			const numbers = [1, 2, 3, 4, 5];
			const result = await client.callTool({
				name: "sum_numbers",
				arguments: { numbers },
			});

			const content = result.content as Array<{ type: string; text: string }>;
			expect(content[0].text).toBe("合計: 15");
		} finally {
			await clientTransport.close();
		}
	});
});
