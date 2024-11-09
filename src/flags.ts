import type { Command } from 'cleye'

import { env } from 'std-env'

export const flags = {
  model: {
    default: env.ARPK_MODEL ?? 'llama3.2',
    type: String,
  },
  ollamaHost: {
    default: env.ARPK_OLLAMA_HOST ?? 'http://127.0.0.1:11434',
    type: String,
  },
} satisfies Command['options']['flags']
