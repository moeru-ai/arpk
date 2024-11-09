# ARPK [![npm](https://img.shields.io/npm/v/arpk)](https://npmjs.com/package/arpk)

> Ollama as your translator, with DeepLX-compatible API.

## Usage

### Prepare

You need to run [Ollama](https://ollama.com/) and download the model you want to use.

```bash
ollama serve
ollama pull llama3.2
```

### Install

First install [Node.js](https://nodejs.org), then install ARPK via your favorite package manager (or npm).

```bash
npm i -g arpk
```

You can also use ARPK via `npx` without installing it:

```bash
npx -y arpk
```

### Translate

```bash
arpk translate --from "EN-US" --to "ZH" --input "Hello, World!"
# 你好，世界！

echo "Hello, World!" | arpk translate --from "EN-US" --to "JA"
# こんにちは、世界！
```

### Serve

```bash
ARPK_MODEL="llama3.2" arpk serve
```

#### npx

```bash
ARPK_MODEL="llama3.2" npx -y arpk serve
```

#### docker

```bash
docker run -d \
  --name arpk \
  --network host \
  --restart unless-stopped \
  -e ARPK_MODEL=llama3.2 \
  ghcr.io/moeru-ai/arpk:latest
```

#### docker-compose

```yaml
services:
  arpk:
    image: ghcr.io/moeru-ai/arpk:latest
    container_name: arpk
    network_mode: host
    restart: unless-stopped
    environment:
      - ARPK_MODEL=llama3.2
```

#### API

`/translate`, `/api/v1/translate` and `/api/v2/translate` are connected to the same translate endpoint.

```ts
await fetch('http://127.0.0.1:1188/translate', {
  body: JSON.stringify({
    source_lang: 'JA',
    target_lang: 'ZH',
    text: '雨の季節が過ぎ 澄み渡る空を 眺めて独り想フ'
  }),
  method: 'POST'
}).then(res => res.json())
// {
//   alternates: [],
//   code: 200,
//   data: '雨季过后，晴朗的天空下我独自遐思。',
//   id: 1519129853500,
//   method: 'ARPK v0.0.0 (llama3.2)',
//   source_lang: 'JA',
//   target_lang: 'ZH'
// }
```

### Environments

> Currently only Bearer Auth is supported when using `ARPK_TOKEN`, not URL Params.

<!-- https://www.tablesgenerator.com/markdown_tables -->

| Environment        | Default                                                       | Description                        |
|--------------------|---------------------------------------------------------------|------------------------------------|
| ARPK_PORT          | 1188                                                          | The port the server will listen on |
| ARPK_MODEL         | llama3.2                                                      | Model to be used by the ARPK       |
| ARPK_TOKEN         | null                                                          | Access token to protect your API   |
| ARPK_OLLAMA_HOST   | http://127.0.0.1:11434                                        | The Ollama host address            |
| ARPK_SYSTEM_PROMPT | https://github.com/moeru-ai/arpk/blob/main/src/lib/prompts.ts | System prompt                      |

## License

[MIT](LICENSE.md)
