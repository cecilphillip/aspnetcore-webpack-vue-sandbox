import Vue from "vue";
import { store } from "./store";
import SignalRConnectionPlugin, { SignalRConnectionOptions } from "./signalr-plugin";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";
import MainComponent from "./main-component/main-component.vue";

Vue.use<SignalRConnectionOptions>(SignalRConnectionPlugin, {
    urls: ["/app", "/second"],
    builderFactory(): HubConnectionBuilder {
        return new HubConnectionBuilder()
            .configureLogging(LogLevel.Information)
            .withHubProtocol(new MessagePackHubProtocol());
    }
});

new Vue({
    el: "#app",
    store,
    components: { MainComponent },
    render: createElement => createElement(MainComponent)
});
