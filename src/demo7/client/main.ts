import Vue from "vue";
import { store } from "./store";
import SignalRConnectionPlugin, { SignalRConnectionOptions} from "./signalr-plugin";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

Vue.use<SignalRConnectionOptions>(SignalRConnectionPlugin, {
    urls:["/app", "/second"],
    buiderFactory(): HubConnectionBuilder {
        return new HubConnectionBuilder()
            .configureLogging(LogLevel.Information)
            .withHubProtocol(new MessagePackHubProtocol());
    }
});

new Vue({
    el: "#app",
    store: store,
    components: {
        MainComponent: () => import('./main-component/main-component.vue')
    }
});