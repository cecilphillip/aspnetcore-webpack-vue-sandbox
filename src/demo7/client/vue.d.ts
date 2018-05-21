import { HubConnection } from "@aspnet/signalr";

declare module "vue/types/vue" {

    interface Vue {
        $signalR: { [index: string]: HubConnection }
    }
}