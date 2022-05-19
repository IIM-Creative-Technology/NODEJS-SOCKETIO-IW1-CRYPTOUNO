<script setup lang="tsx">
    import ToggleTheme from "./ToggleTheme.vue";
    import { useThemeVars } from "naive-ui";
    import { PropType } from "vue";
    import { useUserStore } from "~/stores/user.store";
    import { useDropdownActions } from "~/composables/useDropdownActions";
    import Logo from "~/assets/images/illustration_auth.png";

    // eslint-disable-next-line no-undef
    const emits = defineEmits(["openSideNav"]);
    // eslint-disable-next-line no-undef
    const props = defineProps({
        inverted: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    });

    const userStore = useUserStore();
    const themeVars = useThemeVars();

    const menuActions = useDropdownActions([{ label: "Sign out", icon: "ic:twotone-logout", action: () => userStore.logOut() }]);
</script>

<template>
    <div :style="{ backgroundColor: themeVars.bodyColor }">
        <div :style="{ backgroundColor: themeVars.modalColor }" class="flex justify-between h-[64px] items-center">
            <div class="layout-header-left">
                <div class="flex items-center gap-2 text-lg uppercase ml-4">
                    <img :src="Logo" class="h-6 w-auto" />
                    <NDivider vertical />
                    <span>FIGHT FOR THE CLIM</span>
                </div>
            </div>
            <div class="flex items-center pr-4">
                <ToggleTheme />
                <n-divider vertical />
                <n-dropdown trigger="click">
                    <div class="avatar">
                        <n-dropdown placement="bottom-end" :options="menuActions">
                            <n-avatar round>
                                {{ userStore?.user?.username?.charAt(0).toUpperCase() ?? "??" }}
                            </n-avatar>
                        </n-dropdown>
                    </div>
                </n-dropdown>
            </div>
        </div>
    </div>
</template>
