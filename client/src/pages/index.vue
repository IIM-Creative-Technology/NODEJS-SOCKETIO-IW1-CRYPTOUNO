<template>
    <NTabs>
        <NTabPane label="Tab 1">
            <div>Tab 1 content</div>
        </NTabPane>

        <router-view />
    </NTabs>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
name: home
meta:
    auth: true
</route>
