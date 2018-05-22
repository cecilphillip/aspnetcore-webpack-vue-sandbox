<template>
  <div>
    <h2>Hub API</h2>
    <form v-on:submit.prevent="addNewMessage">
        <input type="text" :value="newMessage" @input="updateNewMessage($event.target.value)">
        <input type="submit" value="Send">
    </form>

    <h2>REST API</h2>
    <form v-on:submit.prevent="addRestMessage">
        <input type="text" :value="newRestMessage" @input="updateNewRestMessage($event.target.value)">
        <input type="submit" value="Send">
    </form>

    <h2>Streaming Hub</h2>
    <form v-on:submit.prevent="countDown">
        <input type="text" :value="number" @input="updateNumber($event.target.value)">
        <input type="submit" value="Send">
    </form>

    <ul>
        <li v-for="(message, index) in messages" :key="index">{{message}}</li>
    </ul>
</div>
</template>

<script lang="ts" src="./main-component.ts"></script>
