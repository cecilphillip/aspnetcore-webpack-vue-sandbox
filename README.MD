# ASP.NET Core, Webpack and Vue.js playground

This repo contains demos showing various ways of configuring webpack and vue.js with ASP.NET Core projects.

Running the samples

```bash
> npm run build-dev or npm run build-prod
> dotnet run
```

## Demos

The master branch is currently targeting .NET Core 2.1 RC1, ASP.NET Core 2.1 RC1, webpack 4.8.3, and TypeScript 2.8.3

- [Demo 1](src/demo1) - Loads Vue & SignalR from CDNs. No webpack. JavaScript in page.

- [Demo 2](src/demo2) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling JavaScript to ES2015. Defines vue.js global component with external template.

- [Demo 3](src/demo3) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling to ES2015. Defines vue.js global component with external template and class decorators.

- [Demo 4](src/demo4) - Loads JavaScript dependencies from NPM. Webpack bundling with TypeScript transpiling to ES2015. Custom vue.js component using single file component with .vue extension.

## Useful tools

- [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=code-github-cephilli)
- [Vetur - Vue tooling for VS Code](https://marketplace.visualstudio.com/items?itemName=octref.vetur&WT.mc_id=code-github-cephilli)
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets&WT.mc_id=code-github-cephilli)
