# ASP.NET Core, Webpack and Vue.js playground

This repo contains demos showing various ways of configuring webpack and vue.js with ASP.NET Core projects.

Running the samples

```bash
> npm run build-dev or npm run build-prod
> dotnet run
```

## Demos

The master branch is currently using .NET Core 2.2, ASP.NET Core 2.2, Vue.js 2.6.8, Vue CLI 3.5.1, webpack 4.29.6 and TypeScript 3.3.3

- [Demo 1](src/demo1) - Loads Vue & SignalR from CDNs. No webpack. JavaScript in page.

- [Demo 2](src/demo2) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling JavaScript to ES2015. Defines vue.js global component with external template.

- [Demo 3](src/demo3) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling to ES2015. Defines vue.js global component with external template and class decorators.

- [Demo 4](src/demo4) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling to ES2015. Custom vue.js component using single file component with .vue extension.

- [Demo 5](src/demo5) - NPM for JavaScript. Webpack bundling with TypeScript transpiling to ES2015. Async vue.js component (SFC). RxJS 6 w/ SignalR stream adapter.

- [Demo 6](src/demo6) - NPM for JavaScript. Webpack bundling with TypeScript transpiling. Async vue.js component (SFC) + vuex state management. RxJS 6 w/ SignalR stream adapter.

- [Demo 7](src/demo7) - NPM for JavaScript. Webpack bundling with TypeScript transpiling. Async vue.js component (SFC) + vuex state management + experimental SignalR VueJS plugin. RxJS 6 w/ SignalR stream adapter.

- [Demo 8](src/demo8) - Simple client side validation using Razor Pages, VueJS and Vee-Validate. Converts data-val-* into Vee-Validate rules

- [Demo 9](src/demo9) - Attempt at (somewhat) unobstrusive validation using Razor Pages, VueJS, Vee-Validate. Converts data-val-* into Vee-Validate rules. Uses a custom [ValidationAttribute](src/demo9/Validation/VeeValidateAttribute.cs) and a custom Vee-Validate [rule](src/demo9/client/validations.ts) to add client side validation to the input elements. Also does remote validation.

- [Demo 10](src/demo10) - Same as demo 9, but built using the .NET CLI and the Vue.js CLI.

- [Demo 11](src/demo11) - Vue CLI w/ [VueCliMiddleware](https://github.com/EEParker/aspnetcore-vueclimiddleware) for development interaction with the Vue cli.


## Useful tools

- [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=academic-0000-cephilli)
- [Vue.js devtools for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/vue-js-devtools/)
- [Vetur - Vue tooling for VS Code](https://marketplace.visualstudio.com/items?itemName=octref.vetur&WT.mc_id=academic-0000-cephilli)
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets&WT.mc_id=academic-0000-cephilli)
