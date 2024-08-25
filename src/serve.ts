import { serve } from '@hono/node-server'
import { prettyJSON } from 'hono/pretty-json'

import { app } from '.'

const { fetch } = app
  .use(prettyJSON())

const port = 1188
// eslint-disable-next-line no-console
console.log(`Server is running on port ${port}`)

serve({
  fetch,
  port,
})
