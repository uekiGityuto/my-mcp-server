# My MCP Server

自分用の MCP サーバー

## 使用方法

VSCode でグローバルに使用したい場合は、settings.json に以下のように記述する。  
args に記載しているパスは適宜修正すること。  
（コマンドパレットから「MCP サーバーの追加コマンドを実行」を選択してもOK）

```json
{
  "mcp": {
    "inputs": [],
    "servers": {
      "my-mcp-server": {
        "command": "npx",
        "args": ["ts-node", "/Users/ueki/pg/my/my-mcp-server/src/server.ts"]
      },
    }
  }
}
```
