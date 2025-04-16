import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true, // グローバルAPIを有効化
		environment: "node", // テスト環境をNode.jsに設定
		include: ["test/**/*.test.ts"], // テスト対象のファイルを指定
	},
});
