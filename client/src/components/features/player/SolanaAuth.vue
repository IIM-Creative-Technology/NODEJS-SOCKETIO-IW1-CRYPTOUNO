<template>
    <wallet-multi-button ref="walletTrigger" :dark="appStore.isDark" />
</template>

<script setup lang="ts">
    import { useWallet, WalletMultiButton } from "solana-wallets-vue";
    import { ref } from "vue";
    import { useAppStore } from "~/stores/app.store";

    const appStore = useAppStore();
    const wallet = useWallet();
</script>
