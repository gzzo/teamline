# What is this?

A React starter project based on React 16, React Router v4, Webpack 4, Redux, and Redux-Saga.

# Installation

```
git clone https://github.com/gzzo/react-base.git project-name
cd project-name
rm -rf .git/
git init
```

# Overview

Below you'll find a list of most packages included with a brief description what they do 
and why they're useful. I'm skipping some of the more obvious packages like React and Babel.

## dependencies

### [classnames](https://github.com/JedWatson/classnames)

I like CSS modules over CSS-in-JS. This is a great little package that lets you combine
class names:

```javascript
const buttonClasses = classNames(css.button, css[`button_${type}`], { 
  css.button_active: isActive, 
})
```

### [connected-react-router](https://github.com/supasate/connected-react-router)

The descendant of [react-router-redux](https://github.com/reactjs/react-router-redux) for
React Router v4.  It allows you to connect your router to your redux store and dispatch 
history methods (`push`, `replace`, etc).

### [cssnano](https://github.com/cssnano/cssnano)

PostCSS plugin to minify CSS.

### [moment](https://github.com/moment/moment/)

_The_ date and time package for JS.  If you're familiar with Python, this is akin to arrow.

### [postcss-import](https://github.com/postcss/postcss-import)

PostCSS plugin to handle `@import` directives in CSS files.  Useful for importing Google Fonts
from your CSS files.  I also like to have a `constants.scss` file that I `@import` from other
CSS, keeps everything nice and tidy and prevents code duplication.

### [postcss-preset-env](https://github.com/csstools/postcss-preset-env)

PostCSS plugin that transforms your modern CSS into backwards compatible CSS.  The level
of compatibility is determined by the `browserslist` you define in your `package.json`.

### [react-helmet](https://github.com/nfl/react-helmet)

Awesome package to manage `<head>` across your application.  The title template feature
is particularly useful.  Also, it's amazing that how appropriately the package is named
given that it's made by the NFL!

### [react-loadable](https://github.com/jamiebuilds/react-loadable)

Can't overstate how amazing this package is.  Code splitting used to be particularly
painful, but this package makes it incredibly simple.  A good understanding of the
[`splitChunks`](https://webpack.js.org/plugins/split-chunks-plugin/) optimization
of webpack will also go a long way to making smaller bundles.

```javascript
const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});
```

### [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

Ever wanted to inspect your store at runtime?  This is what you've been waiting for.
Also includes a nice timeline of actions and the state difference after each action.

### [redux-saga](https://github.com/redux-saga/redux-saga)

A beautiful alternative to `redux-thunk`.  While it may feel like a lot of boilerplate
early on, I use sagas on all actions that fetch from APIs.  There's tons of advanced
features like task forking and cancelling as well.  From their readme, look how intuitive
and easy to read the following is:

```javascript
function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}
```

### [sanitize.css](https://github.com/csstools/sanitize.css)

Opinionated CSS reset.  Also consider [`normalize.css`](https://github.com/csstools/normalize.css)
as an alternative.

### [whatwg-fetch](https://github.com/github/fetch)

A polyfill for `window.fetch`.  A small library to include to support IE11.

## devDependencies

### [babel-plugin-add-react-displayname](https://github.com/opbeat/babel-plugin-add-react-displayname#readme)

This will add a displayName to all your React components.  Yes, it will increase your bundle size,
but it will make reading your Sentry errors a lot easier.

### [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)

Sure, you could import the lodash methods you want manually to minimize your bundle size:

```javascript
import pick from 'lodash/pick'
``` 

Or you could use this plugin that will cherry-pick all your imports.

### [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json)

[Snapshot tests](https://jestjs.io/docs/en/snapshot-testing) are pretty useful for testing UI
components.  It can be easy to overuse them, and they can be a bit annoying when you're changing
defaultProps of components, but overall I think they have their place and can be useful.

### [html-webpack-inline-source-plugin](https://github.com/dustinjackson/html-webpack-inline-source-plugin)

You're splitting your bundle into a `vendor.js`, `main.js`, and `runtime.js`.  This plugin 
lets you inline any chunks into your HTML, which is especially useful for `runtime.js` since
it's particularly small and you can save a round-trip request.

### [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)

Surprisingly simple but useful plugin for snapshot testing.  Instead of creating a blank mock
for all your styles, you can use this plugin which will return the object you're using from 
your styles as-is.  For example:

```javascript
<div className={css.wrapper} />
```

Would normally have an empty className in your snapshots.  With this plugin, however:

```javascript
exports[`test matches snapshot 1`] = `
<div
  className="wrapper" 
/>
`;  
```

### [sass-loader](https://github.com/webpack-contrib/sass-loader)

If you haven't yet checked out Sass, it's a really great addition to CSS.  Comments? Check. 
Nested Rules? Check.  Variables? Check. 

"But, but, CSS variables exist now."  Yes, but they have no IE support at all.  With PostCSS
and sass-loader your variables will be substituted at build time, so you don't have to worry
about browser compatibility.

You'll also have access to a ton of useful functions like `transparentize` and `lighten`.
For example:

```scss
$primary-button-background-color: #17BEBB;
$primary-button-background-color-disabled: transparentize($primary-button-background-color, 0.5);
```

Ever wanted [functions](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#function_directives) in CSS? 

[Mixins?](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#defining_a_mixin)

Math?

```scss
$button-width: 200px;
$button-width-large: $button-width * 2;
```

[There's tooons of features.](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

### [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

This module really helps you understand the makeup of your bundle and what's taking up so much space.
It will help you optimize your bundle and give you an idea of what you should be splitting up
with `react-loadable` and Webpack's `splitChunks`. 
