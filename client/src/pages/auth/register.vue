<template>
    <div class="flex flex-col gap-4">
        <Form :form-options="RegisterFormSchema" clas="h-auto" class="authForm" @onSubmit="SubmitAuth">
            <template #actions="{ toggleSubmit }">
                <NButton secondary class="w-full" type="primary" @click="toggleSubmit">Sign up</NButton>
            </template>
        </Form>
    </div>
</template>

<script setup lang="ts">
    import { Form } from "@chronicstone/vue-sweetforms";
    import { RegisterFormSchema } from "~/schemas/auth.schema";

    const SubmitAuth = (data: { walletToken: string }) => {
        console.log({ data });
    };
</script>

<route lang="yaml">
name: auth.register
meta:
    layout: AuthLayout
</route>
