import { describe, expect, it } from 'vitest'

import { version } from '../package.json' with { type: 'json' }
import { createApp } from '../src/server'

describe('translate', () => {
  // eslint-disable-next-line test/prefer-lowercase-title
  it('GET /translate', async () => {
    const date = Date.now()
    const model = 'mistral-nemo'
    const app = createApp({ baseURL: 'http://localhost:11434/v1/', model })

    const source_lang = 'EN-US'
    const target_lang = 'ZH'

    const res = await app.request('/translate', {
      body: JSON.stringify({
        source_lang,
        target_lang,
        text: 'Hello, World!',
      }),
      method: 'POST',
    })

    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.alternates.length).toBe(0)
    expect(json.code).toBe(200)
    expect(json.data).toBe('你好，世界！')
    expect(json.id).toBeGreaterThan(date)
    expect(json.method).toBe(`ARPK v${version} (${model})`)
    expect(json.source_lang).toBe(source_lang)
    expect(json.target_lang).toBe(target_lang)
  })
})
