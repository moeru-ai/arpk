import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

import type { PromptOptions } from '../lib/prompts'

import { version } from '../../package.json' with { type: 'json' }
import { generateTranslate } from '../lib/translate'

export interface CreateTranslateOptions {
  model: string
  token?: string
}

export interface RequestBody extends PromptOptions {
  /** The text you want to translate. */
  text: string
}

export const createTranslate = ({
  model,
  token,
}: CreateTranslateOptions) => new Hono()
  .post('/', ...(token ? [bearerAuth({ token })] : []), async (c) => {
    const { source_lang, target_lang, text } = await c.req.json<RequestBody>()

    const data = await generateTranslate({
      model,
      source_lang,
      target_lang,
      text,
    })

    return c.json({
      alternates: [],
      code: 200,
      data,
      id: Date.now(),
      method: `ARPK v${version} (${model})`,
      source_lang,
      target_lang,
    })
  })
