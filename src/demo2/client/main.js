import { HubConnectionBuilder, HubConnection, LogLevel } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import Vue from 'vue';

Vue.component("main-component", {
    data: () => {
        return {
            messages: [],
            newMessage: null,
            newRestMessage: null,
            number: null,
            /** @type {HubConnection} */
            connection: null
        }
    },
    methods: {
        addMessage: async function () {
            await this.connection.invoke("Send", { Message: this.newMessage });
            this.newMessage = null;
        },
        addRestMessage: async function () {
            await fetch("/message", {
                method: "post",
                body: JSON.stringify({ Message: this.newRestMessage }),
                headers: {
                    "content-type": "application/json"
                }
            });

            this.newRestMessage = null;
        },
        countDown: async function () {
            var stream = this.connection.stream("CountDown", parseInt(this.number));
            var messages = this.messages;
            stream.subscribe({
                next: function (item) {
                    console.log('item ' + item);
                    messages.push(item);
                }
            });

            this.number = null;
        }
    },

    template: require('./main.html')+"" ,

    created: function() {
        this.connection = new HubConnectionBuilder()
            .configureLogging(LogLevel.Information)
            .withUrl("/app")
            .withHubProtocol(new MessagePackHubProtocol())
            .build();

        console.log(this.connection);

        this.connection.on("Send", message => {
            this.messages.push(message);
        });

        this.connection.start()
            .catch(error => console.error(error));
    }
});

new Vue({ el: "#app" });