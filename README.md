# ARPK [![npm](https://img.shields.io/npm/v/arpk)](https://npmjs.com/package/arpk)

> Ollama as your translator, with DeepLX-compatible API.

## Usage

### Run

#### npm

You can run ARPK directly without installation.

```bash
ARPK_MODEL="llama3.1" npx arpk
```

#### container

> TODO

### API

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
//   data: '雨季过去，天空中清晰透彻。一个人静静地望着天空，陷入沉思。',
//   id: 1519129853500,
//   method: 'ARPK',
//   source_lang: 'JA',
//   target_lang: 'ZH'
// }
```

## License

[MIT](LICENSE.md)
