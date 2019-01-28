Bluebird ui
========

UI components built on Vue, mainly for admin panels.

Vue 3
--------

We now have a version based on Vue 3: https://github.com/orinc/bluebird-ui/tree/vue-3.

Until we officially switch to Vue 3, we'll be maintaining two branches
simultaneously. Compared to `master`, `vue-3` branch should only has
differences due to dependencies.

So if you found a bug or want to implement a new feature, please follow:

1. fix it or implement it on `master` branch
2. rebase `vue-3` branch to new `master`
3. make sure new code works well on `vue-3`, too
4. publish both v0.x (`master`) and v1.x (`vue-3`)

## Install

This is a private package published under GitHub Package Registry.
To install this package, make sure your token is added to file `~/.npmrc` like:

```
//npm.pkg.github.com/:_authToken=<TOKEN>
```
And then install by:

```sh
$ npm install @orinc/bluebird-ui
# or specify the version
$ npm install @orinc/bluebird-ui@0.7.1
```

## Release

To publish the package on GitHub Package Registry, you need a token with `write:packages` and `repo` scopes.

If you make some changes and need to publish a new version, here is the steps:

```sh
# make changes and also upgrade version number in package.json
$ git commit -am "made some changes or bugfix commit message"
# run release command, it will push the commit and build the package and publish to github registry
$ npm run release
```

Usage
--------

1. Install this repo into dependencies
2. import CSS file in the entry file like:
    `import '@orinc/bluebird-ui/dist/bluebird-ui.css';`
3. import component from separated files, like:
    `import Pagination from '@orinc/bluebird-ui/dist/Pagination'`,
    in order to use tree-shaking.
4. for mixins, import them like:
    `import format from '@orinc/bluebird-ui/dist/mixins/format'`


Development
--------

1. Styles should be put in `/src/styl/${component}.styl`, and
    `import` in `<script>` in `${component}.vue` file. Because
    webpack + vue-loader won't merge styles from vue files' `<style>`
    into a single file.

Components
--------

### Alert

| Prop | Type | Comment | Default |
| -------- | -------- | -------- | -------- |
| `status` | Boolean | <ul><li>`true` => `.alert-success` <li>`false` => `.alert-danger`</ul> | `null` |
| `message` | String | Alert message | `''` |
| `auto-hide` | Number | Auto hide alert after `${auto-hide}`ms, `0` means always show | `0` |

### CountDown

| Prop | Type | Comment | Default |
| -------- | -------- | -------- | -------- |
| `tagName` | String | tagName of element | `div` |
| `duration` | Number | counting-down length, in seconds | 7 |
| `message` | String | counting-down message | |
| `countDownText` | String | count-down text | `将于 %s 秒后跳转。` |

### PageHeader

| Prop | Type | Comment | Default |
| -------- | -------- | -------- | -------- |
| `history` | Array | Used to generate breadcrumb navigation | `null` |
| `is-loading` | Boolean | Whether to show spinning spinner | `false` |
| `message` | String | Message to be shown | `''` |
| `title` | String | Page title | `''` |
| `is-title-editor` | Boolean | Whether the title could be edit | `false` |

### Pagination

| Prop | Type | Comment | Default |
| -------- | -------- | -------- | -------- |
| `total` | Number | Number of all items. | `0` |
| `per-page` | Number | Number of per page. | `20` |
| `is-loading` | Boolean | Whether the list is loading. | `false` |
| `is-hide-pages` | Boolean | Hidden the number of pages. | `false` |
| `has-next` | Boolean | Show next page button. It helps on NO-Pages mode. | `false` |

### Tab/Tabs

### TextEditor

### Toggle
