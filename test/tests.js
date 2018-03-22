/* eslint-env node */
/* exported tests */
/* globals loadStylesheets */

(function () {
'use strict';

if (typeof exports !== 'undefined') {
    require('babel-polyfill');
}

const tests = {
    async 'load-stylesheets' (test) {
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
            const [s1, s2] = await loadStylesheets([stylesheet1, stylesheet2]);
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
    async 'load-stylesheets single string' (test) {
        test.expect(4);

        const blueRGB = 'rgb(0, 0, 255)';
        const yellowRGB = 'rgb(255, 255, 0)';
        const stylesheet1 = 'styles1.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            const [s1] = await loadStylesheets(stylesheet1);
            const computedStyles = window.getComputedStyle(testElement);
            test.strictEqual(s1.nodeName.toLowerCase(), 'link');
            test.strictEqual(s1.getAttribute('href'), stylesheet1);
            test.strictEqual(computedStyles.color, blueRGB);
            test.strictEqual(computedStyles.backgroundColor, yellowRGB);
            test.done();
        } catch (err) {
            test.ok(false, 'Error loading stylesheets');
            test.done();
        }
    },
    async 'load-stylesheets erring' (test) {
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadStylesheets([stylesheet1, badStylesheet]);
            test.ok(false, 'Should have been an error after loading bad stylesheet');
            test.done();
        } catch (err) {
            test.ok(true, 'Erred as expected');
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
