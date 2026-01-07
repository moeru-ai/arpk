/* eslint-disable @masknet/no-top-level */
import { cli } from 'cleye'
import { config } from 'dotenv'

import { name, version } from '../package.json' with { type: 'json' }
import { serve } from './commands/serve'
import { translate } from './commands/translate'
import { flags } from './flags'
import { generateTranslate } from './lib/translate'
import { serveApp } from './server'

config()

const argv = cli({
  commands: [
    serve,
    translate,
  ],
  flags,
  name,
  version,
})

if (argv.command === 'serve') {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${argv.flags.port}`)
  serveApp({
    apiKey: argv.flags.apiKey,
    baseURL: argv.flags.baseUrl,
    model: argv.flags.model,
    port: argv.flags.port,
    token: argv.flags.token,
  })
}
else if (argv.command === 'translate') {
  if (argv.flags.to === undefined)
    console.error('Missing flags: --to')

  if (!argv.flags.input || argv.flags.input.length < 1)
    console.error('Missing flags: --input')

  // eslint-disable-next-line antfu/no-top-level-await, no-console
  console.log(await generateTranslate({
    apiKey: argv.flags.apiKey,
    baseURL: argv.flags.baseUrl,
    model: argv.flags.model,
    source_lang: argv.flags.from,
    target_lang: argv.flags.to!,
    text: argv.flags.input,
  }))
}
