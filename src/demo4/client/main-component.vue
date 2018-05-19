<template>
  <div>
    <h2>Hub API</h2>
    <form v-on:submit.prevent="addMessage">
        <input type="text" v-model="newMessage">
        <input type="submit" value="Send">
    </form>

    <h2>REST API</h2>
    <form v-on:submit.prevent="addRestMessage">
        <input type="text" v-model="newRestMessage">
        <input type="submit" value="Send">
    </form>

    <h2>Streaming Hub</h2>
    <form v-on:submit.prevent="countDown">
        <input type="text" v-model="number">
        <input type="submit" value="Send">
    </form>

    <ul>
        <li v-for="(message, index) in messages" :key="index">{{message}}</li>
    </ul>
</div>
</template>

<script lang="ts">
import { HubConnectionBuilder, HubConnection, LogLevel } from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class MainComponent extends Vue {
  messages: string[] = [];
  newMessage: string = "";
  newRestMessage: string = "";
  number: string = "";
  connection: HubConnection = null;

  created() {
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl("/app")
      .withHubProtocol(new MessagePackHubProtocol())
      .build();

    console.log(this.connection);

    this.connection.on("Send", message => {
      this.messages.push(message);
    });

    this.connection.start().catch(error => console.error(error));
  }

  async addMessage() {
    await this.connection.invoke("Send", { Message: this.newMessage });
    this.newMessage = null;
  }
  async addRestMessage() {
    await fetch("/message", {
      method: "post",
      body: JSON.stringify({ Message: this.newRestMessage }),
      headers: {
        "content-type": "application/json"
      }
    });
    this.newRestMessage = null;
  }

  async countDown() {
    var stream = this.connection.stream("CountDown", parseInt(this.number));
    var messages = this.messages;

    stream.subscribe({
      next: function(item) {
        console.log("item " + item);
        messages.push(item);
      },
      complete: function() {},
      error: function() {}
    });

    this.number = null;
  }
}
</script>
