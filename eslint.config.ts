import type { Linter } from 'eslint'

import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu()
  .append(ii({ functional: false })) as Linter.Config
