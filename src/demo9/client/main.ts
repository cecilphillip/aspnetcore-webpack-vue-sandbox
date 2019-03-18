import Vue from "vue";
import "./validations";

let vm = new Vue({
    el: "#serverForm",
    methods: {
        async validateBeforeSubmit(evt: Event) {
            var result = await this.$validator.validateAll();
            if (result) return true;
            evt.preventDefault();
            return false;
        }
    }
});