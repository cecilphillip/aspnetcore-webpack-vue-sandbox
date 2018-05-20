import Vue from "vue";

new Vue({
    el: "#app",
    components: {
        MainComponent: () => import('./main-component.vue')
    }
});