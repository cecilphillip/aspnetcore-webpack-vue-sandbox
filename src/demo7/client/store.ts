import Vue from "vue";
import Vuex, { Store } from "vuex";

export interface StoreState {
    messages: string[];
    newMessage: string;
    newRestMessage: string;
    number: string;
}

Vue.use(Vuex);

export const store = new Store<StoreState>({
    state: {
        messages: [],
        newMessage: "",
        newRestMessage: "",
        number: ""
    },
    mutations: {
        addNewMessage(state: StoreState, message: string) {
            state.messages.push(message);
        },

        updateNewMessage(state: StoreState, newMessage: string) {
            state.newMessage = newMessage;
        },

        updateNewRestMessage(state: StoreState, newRestMessage: string) {
            state.newRestMessage = newRestMessage;
        },

        updateNumber(state: StoreState, number: string) {
            state.number = number;
        }
    }
});