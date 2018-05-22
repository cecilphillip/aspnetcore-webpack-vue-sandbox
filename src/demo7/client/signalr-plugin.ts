import { PluginObject } from "vue";
import { HubConnectionBuilder, HubConnection, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

export interface SignalRConnectionOptions {
    buiderFactory: () => HubConnectionBuilder
    urls: string[]
}

function stripSlash(value: string): string {
    if (value.startsWith("/"))
        value = value.slice(1);
    return value;
}

const SignalRConnectionPlugin: PluginObject<SignalRConnectionOptions> = {
    install(Vue, options?: SignalRConnectionOptions): void {
        if (this.install.installed) return;

        let connections: { [index: string]: HubConnection } = {};

        options.urls.forEach((url: string): void => {
            connections[stripSlash(url)] = options.buiderFactory()
                .withUrl(url)
                .build();
        });

        Vue.mixin({
            destroyed() {
                console.log('Kill all connections');
            }
        });

        Vue.prototype.$signalR = connections;

        this.install.installed = true;
        console.log("SignalR plugin installed...");
    }
}

export default SignalRConnectionPlugin;