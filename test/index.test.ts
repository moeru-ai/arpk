import { describe, expect, it } from 'vitest'

import { version } from '../package.json' with { type: 'json' }
import { createApp } from '../src/server'

describe('index', () => {
  // eslint-disable-next-line test/prefer-lowercase-title
  it('GET /', async () => {
    const app = createApp({ baseURL: 'http://localhost:11434/v1/', model: '' })

    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(`ARPK v${version}`)
  })
})
