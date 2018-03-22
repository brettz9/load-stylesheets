# load-stylesheets

Asynchronously load link-tag stylesheets with promise result indicating load
completion.

The advantage over injecting into `<style>` after `fetch` is that with
`<link>` injection, one gets separate stylesheet documents which don't
clutter the source and which can be viewed as separate documents in
the web console.

Useful for code libraries which allowing for parallel loading of stylesheets
(including optionally user-supplied one(s)) related to that widget/library
but in a modular manner (akin to ES6 Modules but for stylesheets). No
need for your main HTML to specify the stylesheets the widget is
using internally.

## API

```js
(async () => {
const stylesheetElements = await loadStylesheets([
    'path/to/styles.css',
    'a/different/path/to/styles.css'
]);
})();
```

## Demonstration

For example, a code library might use `load-stylesheets` internally
to allow for an API such as:

```js
// main.js
import Widget from './widget.js';

document.title = 'Internationalizable title'; // We even do the title in JavaScript

(async () => {

const widget = await new Widget({
    stylesheets: ['@builtin', '/path/to/custom/styles.css']
}).init();

// the stylesheets were loaded and then the widget added

})();
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
