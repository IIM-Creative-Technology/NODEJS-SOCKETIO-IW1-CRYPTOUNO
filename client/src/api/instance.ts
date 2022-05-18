import axios, { AxiosError, AxiosResponse } from "axios";
import { useReactifiedApi } from "~/composables/useReactifiedApi";
import { useUserStore } from "~/stores/user.store";

export const ApiInstance = axios.create({
    baseURL: `${import.meta.env?.VITE_API_URL ?? ""}` as string,
});

ApiInstance.interceptors.request.use((config) => {
    const userStore = useUserStore();
    config.headers = {
        ...config.headers,
        ...((userStore.accessToken && {
            Authorization: `Bearer ${userStore.accessToken}`,
        }) as unknown as { Authorization: string }),
    };
    return config;
});

ApiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const { messageApi } = useReactifiedApi();
        if (error.config.url === "/auth/login" && error.response?.status === 401) {
            messageApi.error("Incorrect username or password");
        } else if ((error as { response: AxiosResponse })?.response?.data?.message) {
            const rawMsg = (error as { response: AxiosResponse })?.response.data.message;
            if (Array.isArray(rawMsg)) for (const msg of rawMsg) messageApi.error(msg);
            else messageApi.error(rawMsg);
        }
        return Promise.reject(error);
    },
);
