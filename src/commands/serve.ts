import { command } from 'cleye'
import { env } from 'std-env'

import { flags } from '../flags'

export const serve = command({
  alias: ['s', 'server', 'start'],
  flags: {
    ...flags,
    port: {
      alias: 'p',
      default: env.ARPK_PORT ? Number.parseInt(env.ARPK_PORT) : 1188,
      type: Number,
    },
    token: {
      default: env.ARPK_TOKEN,
      type: String,
    },
  },
  name: 'serve',
// fix pkgroll build error
}) as any
