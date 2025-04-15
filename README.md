# My MCP Server

自分用の MCP サーバー

## 使用方法

VSCode で使う場合は、settings.json に以下のように記述する。  
args に記載しているパスは適宜修正すること。  
なお、node コマンドで TypeScript を実行するためには、V23.6.0 以降の Node.js が必要。

```json
{
  "mcp": {
    "inputs": [],
    "servers": {
      "my-mcp-server": {
        "command": "node",
        "args": ["/Users/ueki/pg/my/my-mcp-server/src/server.ts"]
      }
    }
  }
}
```
