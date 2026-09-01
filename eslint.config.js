import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        window: 'writable',
        document: 'writable',
        navigator: 'writable',
        console: 'writable',
        fetch: 'writable',
        setTimeout: 'writable',
        clearTimeout: 'writable',
        setInterval: 'writable',
        clearInterval: 'writable',
        requestAnimationFrame: 'writable',
        cancelAnimationFrame: 'writable',
        performance: 'writable',
        IntersectionObserver: 'writable',
        ResizeObserver: 'writable',
        FileReader: 'writable',
        AbortController: 'writable',
        Image: 'writable',
        URLSearchParams: 'writable',
        Buffer: 'writable',
        FormData: 'writable',
        URL: 'writable',
        location: 'writable',
        localStorage: 'writable',
        sessionStorage: 'writable',
        Event: 'writable',
        CustomEvent: 'writable',
        module: 'writable',
        process: 'writable',
        __dirname: 'writable',
        __filename: 'writable',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.2' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
    },
  },
]
