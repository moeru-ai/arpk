import { config } from 'dotenv'
import { Hono } from 'hono'

import { version } from '../package.json' with { type: 'json' }
import { translate } from './api/translate'

config()

export const app = new Hono()
  .get('/', c => c.text(`ARPK v${version}`))
  .route('/translate', translate)
  .route('/api/v1/translate', translate)
  .route('/api/v2/translate', translate)
