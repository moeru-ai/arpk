import { fstat } from 'node:fs'
import { env, stdin } from 'node:process'
import { text } from 'node:stream/consumers'

import { command } from 'cleye'

import { flags } from '../flags'

// eslint-disable-next-line antfu/no-top-level-await, ts/no-misused-promises
const defaultInput = await new Promise(resolve => fstat(0, async (_err, stats) =>
  resolve(stats.isFIFO() ? await text(stdin) : ''))) satisfies string

export const translate = command({
  alias: ['t', 'translation'],
  flags: {
    ...flags,
    from: {
      alias: 'f',
      default: env.ARPK_SOURCE_LANG,
      type: String,
    },
    input: {
      alias: 'i',
      default: defaultInput,
      type: String,
    },
    to: {
      alias: 't',
      default: env.ARPK_TARGET_LANG,
      type: String,
    },
  },
  name: 'translate',
})
