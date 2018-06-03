import Vue from "vue";
import "./validations";

var vueApp = new Vue({
    el: "#serverForm",
    methods: {
        async validateBeforeSubmit(evt:Event) {
            var result = await this.$validator.validateAll();
            if (result) return true;
            evt.preventDefault();
            return false;
        }
    }
});