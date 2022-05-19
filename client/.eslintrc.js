module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "@vue/typescript/recommended", "@vue/prettier"],
    parserOptions: {
        ecmaVersion: 2021,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        "vue/multi-word-component-names": [
            "error",
            {
                ignores: ["register", "login", "index"],
            },
        ],
    },
};
