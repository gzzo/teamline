module.exports = {
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
    ],
    globals: {
        DEBUG: false,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    plugins: [
        'import',
    ],
    settings: {
        react: {
            version: '16.0',
        },
    },
    rules: {
        'block-spacing': 'error',
        'consistent-return': 'error',
        'eqeqeq': 'error',
        'func-names': 'error',
        'lines-between-class-members': 'error',
        'no-else-return': 'error',
        'no-eval': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-param-reassign': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',

        // https://eslint.org/docs/rules/no-unused-vars#ignorerestsiblings
        'no-unused-vars': [
            'error', {
                'ignoreRestSiblings': true,
                'argsIgnorePattern': '^_',
            }
        ],

        // https://github.com/benmosher/eslint-plugin-import
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'always-and-inside-groups',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
            },
        ],

        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        'react/jsx-boolean-value': 'error',
        'react/jsx-curly-brace-presence': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/prop-types': 'off',
        'react/sort-comp': 'error',
        'react/style-prop-object': 'error',
        'react/no-deprecated': 'error',
    }
}
