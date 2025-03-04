import { GLOB_MARKDOWN_CODE } from '@antfu/eslint-config'
import { defineConfig } from '@importantimport/eslint-config'

export default defineConfig({ typescript: { tsconfigPath: './tsconfig.json' } }, {
  files: [GLOB_MARKDOWN_CODE],
  rules: {
    '@masknet/no-then': 'off',
    '@masknet/no-top-level': 'off',
    '@masknet/unicode-specific-set': 'off',
  },
})
