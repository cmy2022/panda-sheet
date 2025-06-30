import antfu from '@antfu/eslint-config'

export default antfu({
  yaml: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  rules: {
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'log'],
      },
    ],
    // 'perfectionist/sort-imports': 'warn',
    'perfectionist/sort-named-exports': 'warn',
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        //   ignoreCase: false,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
})
