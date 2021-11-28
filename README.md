Muimui ui
=========

A simple Vue 3 UI components, mainly for admin panels.

## Install

This is a private package published under GitHub Package Registry.
To install this package, make sure your token is added to file `~/.npmrc` like:

```
//npm.pkg.github.com/:_authToken=<TOKEN>
```
And then install by:

```sh
$ npm install @meathill/muimui-ui
# or specify the version
$ npm install @meathill/muimui-ui@0.7.1
```


Usage
--------

1. Install this repo into dependencies
2. Import CSS file in the entry file like:
    `import '@meathill/muimui-ui/dist/muimui-ui.css';`
3. Import component from separated files, like:
    `import Pagination from '@meathill/muimui-ui/dist/Pagination'`,
    in order to use tree-shaking.
4. For mixins, import them like:
    `import format from '@meathill/muimui-ui/dist/mixins/format'`


Development
-----------

1. Styles should be put in `/src/styl/${component}.styl`, and
    `import` in `<script>` in `${component}.vue` file. Because
    webpack + vue-loader won't merge styles from vue files' `<style>`
    into a single file.


Components
----------

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
