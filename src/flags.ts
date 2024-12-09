import type { Command } from 'cleye'

import { env } from 'node:process'

export const flags = {
  apiKey: {
    default: env.ARPK_LLM_API_KEY,
    type: String,
  },
  baseURL: {
    default: env.ARPK_LLM_BASE_URL ?? 'http://localhost:11434/v1/',
    type: String,
  },
  model: {
    default: env.ARPK_MODEL ?? 'llama3.2',
    type: String,
  },
} satisfies Command['options']['flags']
