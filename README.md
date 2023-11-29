# load-stylesheets

[![Dependencies](https://img.shields.io/david/brettz9/load-stylesheets.svg)](https://david-dm.org/brettz9/load-stylesheets)
[![devDependencies](https://img.shields.io/david/dev/brettz9/load-stylesheets.svg)](https://david-dm.org/brettz9/load-stylesheets?type=dev)
[![npm](http://img.shields.io/npm/v/load-stylesheets.svg)](https://www.npmjs.com/package/load-stylesheets)
[![License](https://img.shields.io/npm/l/load-stylesheets.svg)](LICENSE-MIT)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/brettz9/load-stylesheets.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/load-stylesheets/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/brettz9/load-stylesheets.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/load-stylesheets/alerts/)

Asynchronously load link-tag stylesheets with promise result indicating load
completion. May also be used for favicon-loading.

The advantage over injecting into `<style>` after `fetch` is that with
`<link>` injection, one gets separate stylesheet documents which don't
clutter the source and which can be viewed as separate documents in
the web console. Loading also appears to occur more quickly.

Useful for code libraries which allowing for parallel loading of stylesheets
(including optionally user-supplied one(s)) related to that widget/library
but in a modular manner (akin to ES6 Modules but for stylesheets). No
need for your main HTML to specify the stylesheets the widget is
using internally.

## Install

### Node install

`npm i load-stylesheets`

or:

`yarn add load-stylesheets`

### Browser install

```html
<script src="node_modules/load-stylesheets/dist/index-umd.cjs"></script>
```

The global will be `loadStylesheets`.

or, using ES6 modules:

```js
import loadStylesheets from './node_modules/load-stylesheets/dist/index-es.js';
```

## API

```
<Promise> promise = loadStylesheets(<string|Array of strings and/or two-item arrays of path and options> paths, <object> options?);
```

- ***paths*** - A string path or array of string paths indicating stylesheets
    to load. In place of string paths, one may add a two-item array of a
    stylesheet path and options which override the main `loadStylesheets` options
    on a case-by-case basis
- ***options*** - An optional object hash with the following optional parameters
    - ***after*** - A reference element after which the created stylesheet
        `<link>` will be added. Choose this or `before` or the default which
            adds to the end of the `<head>`.
    - ***before*** - A reference element before which the created stylesheet
        `<link>` will be added. Choose this or `after` or the default which
            adds to the end of the `<head>`.
    - ***Favicon options***
        - *favicon* - A boolean to indicate whether this is a favicon. This is
            only needed if the URL does not end with ".ico". Otherwise, and if
            this is not true, the URL will be treated as a stylesheet.
        - *image* - A boolean (default: true) to indicate whether a favicon
            is first loaded as an image so as to detect its load event. Since
            browsers do not seem to report `load` events for favicon links
            otherwise, keeping this as `true` allows us to know when the image
            has loaded. If set to `false`, the separate loading as an image is
            avoided and the favicon promise will resolve immediately as the
            `<link>` is added to the page regardless of whether it has loaded
            or not.
        - *canvas* - This option is used if `image` is set to `true`
            (default: false). This option will determine whether the image that
            is loaded is converted into a canvas and loaded as a `data:` URL.
            If `false`, the image loading will merely serve to detect the point
            of image load (hopefully with the browser caching the image), but
            the favicon image file URL will be used as the `<link>` `href`
            (again, hopefully with the image just cached) rather than any
            kind of `data:` URL.

## Example (basic)

```js
const stylesheetElements = await loadStylesheets([
  'path/to/styles.css',
  'a/different/path/to/styles.css'
]);
```

## Example (with config)

```js
const stylesheetElements = await loadStylesheets([
  'path/to/styles.css',
  ['path/to/favicon.png', {favicon: true, before: document.head}],
  'a/different/path/to/styles.css'
], {before: document.body.lastElementChild});
```

## Demonstration

For example, a code library might use `load-stylesheets` internally
to allow for an API such as:

```js
// main.js
import Widget from './widget.js';

// We even do the title in JavaScript
document.title = 'Internationalizable title';

const widget = await new Widget({
  stylesheets: ['@builtin', '/path/to/custom/styles.css']
}).init();

// the stylesheets were loaded and then the widget added
```

```js
// widget.js
import loadStylesheets from 'load-stylesheets';

class Widget {
  constructor ({stylesheets}) {
    // We'll allow control in one place of whether the user wants the
    //   built-in stylesheets for this widget or not
    this.stylesheets = stylesheets.map((s) => {
      return s === '@builtin' ? '/path/to/widget.css' : s;
    });
  }
  async init () {
    this._stylesheetElements = await loadStylesheets(this.stylesheets);

    // The stylesheets have now been loaded, so your widget will be
    //      added without "jankiness" and without need for your users to
    //      non-modularly add stylesheets to their main HTML

    // Begin widget-building code here

    return this; // Return `Widget` instance for convenience
  }
}
export default Widget;
```

After building the ES6 modules (e.g., using Rollup), your HTML will then
be as clean as:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="module" src="dist/main.js"></script>
  </body>
</html>
```

## Related libraries

- [fetch-inject](https://git.habd.as/jhabdas/fetch-inject) - Inserts `<style>` tags (and also `<script>`)
