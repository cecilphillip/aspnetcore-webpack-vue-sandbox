import Vue from "vue";
import { store } from "./store";

new Vue({
    el: "#app",
    store: store,
    components: {
        MainComponent: () => import('./main-component/main-component.vue')
    }
});