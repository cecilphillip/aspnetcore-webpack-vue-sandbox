declare module '*.html' {
    var _: string;
    export default _;
}

declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}