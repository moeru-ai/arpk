import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import type { CreateTranslateOptions } from './translate'

import { version } from '../../package.json' with { type: 'json' }
import { createTranslate } from './translate'

export interface ServeAppOptions extends CreateTranslateOptions {
  port: number
}

export const serveApp = ({ model, port, token }: ServeAppOptions) => {
  const translate = createTranslate({ model, token })

  const { fetch } = new Hono()
    .use(logger())
    .get('/', c => c.text(`ARPK v${version}`))
    .route('/translate', translate)
    .route('/api/v1/translate', translate)
    .route('/api/v2/translate', translate)
    .use(prettyJSON())

  serve({
    fetch,
    port,
  })
}
