module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
        'vuejs-accessibility/form-control-has-label': ['off'],
        'vuejs-accessibility/label-has-for': [
            'off',
            {
                components: ['VLabel'],
                controlComponents: ['VInput'],
                required: {
                    every: ['id'],
                },
                allowChildren: false,
            },
        ],
        'vuejs-accessibility/media-has-caption': ['off'],
    },
};
