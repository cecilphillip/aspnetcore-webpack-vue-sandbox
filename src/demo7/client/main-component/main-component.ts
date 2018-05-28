import { HubConnectionBuilder, HubConnection, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

import { map, filter, switchMap } from 'rxjs/operators';
import { adapt } from '../stream-adapter';
import { StoreState } from "../store";

@Component
export default class MainComponent extends Vue implements StoreState {
    @State messages
    @State newMessage
    @State newRestMessage
    @State number

    @Mutation updateNewMessage
    @Mutation updateNewRestMessage
    @Mutation updateNumber
    @Mutation addNewMessage

    created() {
        let conn = this.$signalR["app"];

        conn.on("Send", message => {
            this.addNewMessage(message);
        });

        let secondConn = this.$signalR["second"];
        secondConn.on("Fire", message => {
            this.addNewMessage(message);
        });

        Promise.all([conn.start(), secondConn.start()])
            .catch(error => console.error(error));
    }

    async addMessage() {
        let conn = this.$signalR["app"];
        await conn.invoke("Send", { Message: this.newMessage });

        let secondConn = this.$signalR["second"];
        await secondConn.invoke("Fire", this.newMessage);

        this.updateNewMessage("");
    }

    async addRestMessage() {
        await fetch("/message", {
            method: "post",
            body: JSON.stringify({ Message: this.newRestMessage }),
            headers: {
                "content-type": "application/json"
            }
        });
        this.updateNewMessage("");
    }

    async countDown() {
        let conn = this.$signalR["app"];
        var stream = conn.stream<string>("CountDown", parseInt(this.number));
        var store = this.$store;

        adapt(stream).pipe(
            filter(x => parseInt(x) % 2 === 0)
        ).subscribe(x => this.addNewMessage(x));

        this.updateNumber("");
    }
}