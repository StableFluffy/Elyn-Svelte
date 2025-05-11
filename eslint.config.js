import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tsParser from '@typescript-eslint/parser';
import svelteConfig from './svelte.config.js';
import svelteParser from 'svelte-eslint-parser';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...svelte.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint,
      svelte,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'no-tabs': ['error', { 'allowIndentationTabs': true }],
      'semi': ['error', 'always'],
      'object-shorthand': 'error',
      'no-irregular-whitespace': 'off',
      
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
        project: './tsconfig.json',
        tsconfigRootDir: '.',
        svelteConfig,
      },
    },
    rules: {
      'svelte/valid-compile': 'error',
      'svelte/no-at-html-tags': 'warn',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/html-quotes': ['error', { 'prefer': 'double' }],
      'svelte/html-self-closing': 'error',
      'svelte/shorthand-attribute': 'error',
      'svelte/spaced-html-comment': 'error',
      'svelte/no-trailing-spaces': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.svelte.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
      },
    },
  },
];
