export const LoginFormSchema = {
    fields: [{ key: "walletToken", label: "Wallet Token", type: "text", required: true }],
};

export const RegisterFormSchema = {
    fields: [
        { key: "username", label: "Username", type: "text", placeholder: "ChronicStone", required: true },
        { key: "walletToken", label: "Wallet Token", type: "text", placeholder: "kjUaL6zmLeRETLMfP7MW35ZUNlu5uyA7", required: true },
    ],
};
