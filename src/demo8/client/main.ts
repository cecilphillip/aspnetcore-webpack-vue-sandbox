import Vue from "vue";
import "./validations";

new Vue({
    el: "#serverForm",
    methods: {
        async validateBeforeSubmit() {
            debugger;
            var result = await this.$validator.validateAll();
            if (result) return true;
            return false;
        }
    }
});