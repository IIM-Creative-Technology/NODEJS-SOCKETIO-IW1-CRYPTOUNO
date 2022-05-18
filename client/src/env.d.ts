/// <reference types="vite/client" />

declare module "*.vue" {
    import type { Component, DefineComponent } from "vue";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "@chronicstone/vue-sweetforms" {
    import type { Component } from "vue";
    interface FormSchema {
        title?: string;
        gridSize?: string | number;
        fieldSize?: string | number;
        fullScreen?: string | boolean;
        minWidth?: string | number;
        maxWidth?: string | number;
        fields?: any[];
        steps?: any[];
    }
    interface FormApi {
        createForm: (formSchema: FormSchema, inputData?: { [key: string]: any }) => Promise<{ formData: { [key: string]: any }; isCompleted: boolean }>;
    }
    export function useSweetform(): FormApi;
    export const Form: Component;
}
