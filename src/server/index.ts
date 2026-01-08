import type { CreateTranslateOptions } from './translate'

import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Hono } from 'hono/tiny'
import { FastResponse, serve } from 'srvx'

import { version } from '../../package.json'
import { createTranslate } from './translate'

export interface ServeAppOptions extends CreateTranslateOptions {
  port: number
}

export const createApp = ({ apiKey, baseURL, model, token }: Omit<ServeAppOptions, 'port'>) => {
  const translate = createTranslate({ apiKey, baseURL, model, token })

  return new Hono()
    .use(logger())
    .get('/', c => c.text(`ARPK v${version}`))
    .route('/translate', translate)
    .route('/api/v1/translate', translate)
    .route('/api/v2/translate', translate)
    .use(prettyJSON())
}

export const serveApp = ({ apiKey, baseURL, model, port, token }: ServeAppOptions) => {
  /** @see {@link https://srvx.h3.dev/guide/node#fastresponse} */
  globalThis.Response = FastResponse

  const { fetch } = createApp({ apiKey, baseURL, model, token })

  serve({ fetch, port })
}
