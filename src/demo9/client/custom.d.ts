declare module '*.html' {
    var _: string;
    export default _;
}

declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}

import Vue from 'vue';
import { Validator } from "vee-validate";

declare module "vue/types/vue" {
    interface Vue {
        $validator: Validator
    }
}