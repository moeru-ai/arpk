import type { Command } from 'cleye'

import { env } from 'node:process'

export const flags = {
  apiBase: {
    default: env.ARPK_API_BASE ?? 'http://localhost:11434/v1/',
    type: String,
  },
  apiPath: {
    default: env.ARPK_API_PATH ?? 'chat/completions',
    type: String,
  },
  model: {
    default: env.ARPK_MODEL ?? 'llama3.2',
    type: String,
  },
} satisfies Command['options']['flags']
