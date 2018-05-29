/* eslint-env node */
/* exported tests */
/* globals Loader */

(function () {
'use strict';

const {loadExternals, loadResources} = Loader;

if (typeof exports !== 'undefined') {
    require('babel-polyfill');
}

function setUp () {
    [...document.querySelectorAll('link,style')].forEach((el) => {
        if (!el.href || !el.href.includes('nodeunit')) el.remove();
    });
    // We're not adding to the page anyways, so no need for this now
    // Not working when added to the suite (even with callback):
    //    https://github.com/caolan/nodeunit/issues/212
    // [...document.querySelectorAll('.test')].forEach((el) => el.remove());
}

const tests = {
    async 'load style (through `loadResources`)' (test) {
        setUp();
        test.expect(4);

        const blueRGB = 'rgb(0, 0, 255)';
        const yellowRGB = 'rgb(255, 255, 0)';
        const stylesheet1 = 'styles1.css';
        const stylesheet2 = 'styles2.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);
        try {
            const [s1, s2] = await loadResources([stylesheet1, stylesheet2]);
            const computedStyles = window.getComputedStyle(testElement);
            test.strictEqual(s1.nodeName.toLowerCase(), 'style');
            test.strictEqual(s2.nodeName.toLowerCase(), 'style');
            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, yellowRGB);
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'load stylesheet links (through `loadResources`)' (test) {
        setUp();
        test.expect(6);

        const blueRGB = 'rgb(0, 0, 255)';
        const yellowRGB = 'rgb(255, 255, 0)';
        const stylesheet1 = 'styles1.css';
        const stylesheet2 = 'styles2.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);
        try {
            const [s1, s2] = await loadResources([stylesheet1, stylesheet2], {link: true});
            const computedStyles = window.getComputedStyle(testElement);
            test.strictEqual(s1.nodeName.toLowerCase(), 'link');
            test.strictEqual(s2.nodeName.toLowerCase(), 'link');
            test.strictEqual(s1.getAttribute('href'), stylesheet1);
            test.strictEqual(s2.getAttribute('href'), stylesheet2);

            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, yellowRGB);
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'load stylesheet links (through `loadExternals`)' (test) {
        setUp();
        test.expect(6);

        const blueRGB = 'rgb(0, 0, 255)';
        const yellowRGB = 'rgb(255, 255, 0)';
        const stylesheet1 = 'styles1.css';
        const stylesheet2 = 'styles2.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);
        try {
            const [s1, s2] = await loadExternals([stylesheet1, stylesheet2]);
            const computedStyles = window.getComputedStyle(testElement);
            test.strictEqual(s1.nodeName.toLowerCase(), 'link');
            test.strictEqual(s2.nodeName.toLowerCase(), 'link');
            test.strictEqual(s1.getAttribute('href'), stylesheet1);
            test.strictEqual(s2.getAttribute('href'), stylesheet2);

            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, yellowRGB);
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'load stylesheet links single string' (test) {
        setUp();
        test.expect(4);

        const blueRGB = 'rgb(0, 0, 255)';
        // const yellowRGB = 'rgb(255, 255, 0)';
        const noRGB = 'rgba(0, 0, 0, 0)';
        const stylesheet1 = 'styles1.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            const [s1] = await loadExternals(stylesheet1);
            const computedStyles = window.getComputedStyle(testElement);

            test.strictEqual(s1.nodeName.toLowerCase(), 'link');
            test.strictEqual(s1.getAttribute('href'), stylesheet1);
            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, noRGB);
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'load stylesheet links erring' (test) {
        setUp();
        test.expect(1);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadExternals([stylesheet1, badStylesheet]);
            test.ok(false, 'Should have been an error after loading bad stylesheet');
            test.done();
        } catch (err) {
            test.ok(true, 'Erred as expected');
            test.done();
        }
    },
    async 'load-stylesheets erring (ignoring option)' (test) {
        setUp();
        test.expect(1);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadExternals([stylesheet1, badStylesheet], {acceptErrors: true});
            test.ok(true, 'Should ignore errors after loading bad stylesheet');
            test.done();
        } catch (err) {
            test.ok(false, 'Should not have erred');
            test.done();
        }
    },
    async 'load-stylesheets erring (ignoring callback)' (test) {
        setUp();
        test.expect(2);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadExternals([stylesheet1, badStylesheet], {
                acceptErrors: ({stylesheetURL, options, resolve, reject}) => {
                    test.ok(
                        stylesheetURL === badStylesheet,
                        'Should report bad stylesheet to callback; found: ' + stylesheetURL
                    );
                    resolve();
                }
            });
            test.ok(true, 'Should ignore errors after loading bad stylesheet');
            test.done();
        } catch (err) {
            test.ok(false, 'Should not have erred');
            test.done();
        }
    },
    async 'favicon' (test) {
        setUp();
        test.expect(2);

        const favicon1 = 'favicon.ico';

        try {
            const [f1] = await loadExternals(favicon1, {favicon: true});
            test.strictEqual(f1.nodeName.toLowerCase(), 'link');
            test.strictEqual(f1.getAttribute('type'), 'image/x-icon');
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'favicon and stylesheets' (test) {
        setUp();
        test.expect(6);

        const favicon1 = 'favicon.ico';
        const blueRGB = 'rgb(0, 0, 255)';
        // const yellowRGB = 'rgb(255, 255, 0)';
        const noRGB = 'rgba(0, 0, 0, 0)';
        const stylesheet1 = 'styles1.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            const [s1, f1] = await loadExternals([
                stylesheet1,
                [favicon1, {favicon: true}]
            ]);
            const computedStyles = window.getComputedStyle(testElement);
            test.strictEqual(s1.nodeName.toLowerCase(), 'link');
            test.strictEqual(s1.getAttribute('href'), stylesheet1);
            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, noRGB);

            test.strictEqual(f1.nodeName.toLowerCase(), 'link');
            test.strictEqual(f1.getAttribute('type'), 'image/x-icon');
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    }
};

if (typeof exports !== 'undefined') {
    module.exports = tests;
} else {
    window.tests = tests;
}
}());
