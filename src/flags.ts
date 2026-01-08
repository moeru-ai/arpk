import type { Command } from 'cleye'

import { env } from 'node:process'

export const flags = {
  apiKey: {
    default: env.ARPK_LLM_API_KEY,
    type: String,
  },
  baseUrl: {
    default: env.ARPK_LLM_BASE_URL ?? 'http://localhost:11434/v1/',
    type: String,
  },
  model: {
    default: env.ARPK_LLM_MODEL ?? 'llama3.2',
    type: String,
  },
  seed: {
    default: env.ARPK_LLM_SEED != null ? Number.parseInt(env.ARPK_LLM_SEED) : undefined,
    type: Number,
  },
} satisfies Command['options']['flags']
