import { command } from 'cleye'
import { fstat } from 'node:fs'
import { stdin } from 'node:process'
import { text } from 'node:stream/consumers'

import { flags } from '../flags'

// eslint-disable-next-line antfu/no-top-level-await
const defaultInput = await new Promise(resolve => fstat(0, async (_err, stats) =>
  resolve(stats.isFIFO() ? await text(stdin) : ''))) satisfies string

export const translate = command({
  alias: ['t', 'translation'],
  flags: {
    ...flags,
    from: {
      alias: 'f',
      type: String,
    },
    input: {
      alias: 'i',
      default: defaultInput,
      type: String,
    },
    to: {
      alias: 't',
      type: String,
    },
  },
  name: 'translate',
})
