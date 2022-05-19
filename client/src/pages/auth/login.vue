<template>
    <div class="flex flex-col gap-4 items-center">
        <SolanaAuth />
    </div>
</template>

<script setup lang="ts">
    import SolanaAuth from "~/components/features/player/SolanaAuth.vue";
    import { useWallet } from "solana-wallets-vue";
    import { watch } from "vue";
    import { useUserStore } from "~/stores/user.store";

    const userStore = useUserStore();

    const { publicKey } = useWallet();
    watch(
        () => publicKey.value,
        (publicKey) => publicKey?.toBase58() && userStore.logIn(publicKey?.toBase58()),
        { immediate: true, deep: true },
    );

    //
</script>

<route lang="yaml">
name: auth.login
meta:
    layout: AuthLayout
</route>
