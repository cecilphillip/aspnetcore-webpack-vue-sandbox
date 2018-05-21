import { HubConnectionBuilder, HubConnection, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

import Vue from "vue";
import { Component } from "vue-property-decorator";

import { map, filter, switchMap } from 'rxjs/operators';
import { adapt } from '../stream-adapter';

@Component({})
export default class MainComponent extends Vue {

    get messages(): string[] {
        return this.$store.state.messages;
    }

    get newMessage(): string {
        return this.$store.state.newMessage;
    }

    set newMessage(value: string) {
        this.$store.commit('updateNewMessage', value);
    }

    get newRestMessage(): string {
        return this.$store.state.newRestMessage;
    }

    set newRestMessage(value: string) {
        this.$store.commit('updateNewRestMessage', value);
    }

    get number(): string {
        return this.$store.state.number;
    }

    set number(value: string) {
        this.$store.commit('updateNumber', value);
    }

    created() {
        console.log(this.$signalR);
        let conn = this.$signalR["app"];

        conn.on("Send", message => {
            this.$store.commit("addNewMessage", message);
        });

        let secondConn = this.$signalR["second"];
        secondConn.on("Fire", message => {
            this.$store.commit("addNewMessage", message);
        });

        Promise.all([conn.start(), secondConn.start()])
            .catch(error => console.error(error));
    }

    async addMessage() {
        let conn = this.$signalR["app"];
        await conn.invoke("Send", { Message: this.newMessage });

        let secondConn = this.$signalR["second"];
        await secondConn.invoke("Fire", this.newMessage);

        this.$store.commit("updateNewMessage", null);
    }

    async addRestMessage() {
        await fetch("/message", {
            method: "post",
            body: JSON.stringify({ Message: this.newRestMessage }),
            headers: {
                "content-type": "application/json"
            }
        });
        this.$store.commit("updateNewRestMessage", null);
    }

    async countDown() {
        let conn = this.$signalR["app"];
        var stream = conn.stream<string>("CountDown", parseInt(this.number));
        var store = this.$store;

        adapt(stream).pipe(
            filter(x => parseInt(x) % 2 === 0)
        ).subscribe(x => store.commit("addNewMessage", x));

        this.number = null;
    }
}