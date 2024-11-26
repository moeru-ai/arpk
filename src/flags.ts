import type { Command } from 'cleye'

import { env } from 'node:process'

export const flags = {
  model: {
    default: env.ARPK_MODEL ?? 'llama3.2',
    type: String,
  },
} satisfies Command['options']['flags']
