module.exports = {
    root: true,
    env: {
        "node": true,
        "es2021": true
    },
    parserOptions: {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    plugins: [
        "vue"
    ],
    rules: {
        "max-lines-per-function": ["error", 80],
        "max-lines": ["error", 300]
    }
};