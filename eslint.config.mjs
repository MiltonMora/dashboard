import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier', 'eslint:recommended'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  }),
]

export default eslintConfig