<template>
    <NLayout position="absolute" class="h-[100vh]" :native-scrollbar="false">
        <NLayoutHeader bordered style="background: transparent !important" :inverted="false" position="left">
            <Header />
        </NLayoutHeader>
        <NLayoutContent content-style="padding: 24px; margin-bottom: auto;min-height: 80vh;">
            <router-view />
        </NLayoutContent>
    </NLayout>
</template>

<script setup lang="ts">
    import Header from "~/components/layout/HeaderNavbar.vue";
</script>
