# ✨Glitter (WIP)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/Akimotorakiyu/glitter) ![license](https://img.shields.io/github/license/Akimotorakiyu/glitter)

✨Glitter is a modern vanilla mvvm framework

[Netlify](https://clever-rosalind-9cee08.netlify.app/) | [国内网站](https://glitter-5g2wqb7gd1e49cc0-1259330986.ap-shanghai.app.tcloudbase.com/)

## Features

### Reactive

- glitterReactive, inspired by `@vue/reactive`

### Vanilla

- no runtime
- vanilla element

### Component

### Composition-Api

- provide-inject / definePortal
- lifecycle(WIP)

### features component

- fragment
- dynamic list
- dynamic component
- if condition
- keep alive

### function component

- defineView

### factory component

- defineFactoryComponent
- defineFactoryComponentStateFactory

### custome render

- IElementCreator

## Philosophy

### Maintainability

#### Isolate

- defineView
- defineStateFactory
- defineFactoryComponent
- defineFactoryComponentStateFactory

#### Compose

- View (defineView in view level)
- ViewContext (defineFactoryComponent in view level )
