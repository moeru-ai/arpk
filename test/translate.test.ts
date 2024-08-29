import { describe, expect, it } from 'vitest'

import { app } from '../src'

describe('translate', () => {
  // eslint-disable-next-line test/prefer-lowercase-title
  it('GET /translate', async () => {
    const source_lang = 'EN'
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
    // ignores: alternates, id
    expect(json.code).toBe(200)
    expect(json.data).toBe('你好，世界！')
    expect(json.method).toBe('ARPK')
    expect(json.source_lang).toBe(source_lang)
    expect(json.target_lang).toBe(target_lang)
  })
})
