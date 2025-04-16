# My MCP Server

自分用の MCP サーバー

## 使用方法

### 事前準備

```sh
npm run build
```

### LLM 側の設定

VSCode で使う場合は、settings.json に以下のように記述する。  
args に記載しているパスは適宜修正すること。  
なお、ts-node コマンドが使えれば、build せずに server.ts を直接指定してできるはず。

```json
{
  "mcp": {
    "inputs": [],
    "servers": {
      "my-mcp-server": {
        "command": "node",
        "args": ["/Users/ueki/pg/my/my-mcp-server/dist/server.js"]
      }
    }
  }
}
```
