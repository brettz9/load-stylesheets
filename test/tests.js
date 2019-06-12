/* eslint-env mocha, node */
/* globals loadStylesheets, require */
/* eslint-disable strict, import/unambiguous, global-require */

// import loadStylesheets from '../dist/index-es.js';
'use strict';

var chai; // eslint-disable-line no-var
(function () {
if (typeof exports !== 'undefined') {
    require('core-js-bundle');
    chai = require('chai');
}

mocha.setup('bdd');

const {assert, expect} = chai;

/**
 * @returns {void}
 */
function setUp () {
    [...document.querySelectorAll('link')].forEach((el) => {
        if (!el.href.includes('mocha')) el.remove();
    });
}

describe('load-stylesheets', function () {
    it('load-stylesheets', async () => {
        setUp();
        expect(6);

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
            expect(s1.nodeName.toLowerCase()).equal('link');
            assert.strictEqual(s2.nodeName.toLowerCase(), 'link');
            assert.strictEqual(s1.getAttribute('href'), stylesheet1);
            assert.strictEqual(s2.getAttribute('href'), stylesheet2);

            assert.strictEqual(computedStyles.color, blueRGB);
            assert.strictEqual(computedStyles.backgroundColor, yellowRGB);
        } catch (err) {
            assert.ok(false, 'Error loading stylesheets');
        }
    });
    it('load-stylesheets single string', async () => {
        setUp();
        expect(4);

        const blueRGB = 'rgb(0, 0, 255)';
        // const yellowRGB = 'rgb(255, 255, 0)';
        const noRGB = 'rgba(0, 0, 0, 0)';
        const stylesheet1 = 'styles1.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            const [s1] = await loadStylesheets(stylesheet1);
            const computedStyles = window.getComputedStyle(testElement);

            assert.strictEqual(s1.nodeName.toLowerCase(), 'link');
            assert.strictEqual(s1.getAttribute('href'), stylesheet1);
            assert.strictEqual(computedStyles.color, blueRGB);
            assert.strictEqual(computedStyles.backgroundColor, noRGB);
        } catch (err) {
            assert.ok(false, 'Error loading stylesheets');
        }
    });
    it('load-stylesheets erring', async () => {
        setUp();
        expect(1);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadStylesheets([stylesheet1, badStylesheet]);
            assert.ok(
                false, 'Should have been an error after loading bad stylesheet'
            );
        } catch (err) {
            assert.ok(true, 'Erred as expected');
        }
    });
    it('load-stylesheets erring (ignoring option)', async () => {
        setUp();
        expect(1);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadStylesheets([stylesheet1, badStylesheet], {
                acceptErrors: true
            });
            assert.ok(
                true, 'Should ignore errors after loading bad stylesheet'
            );
        } catch (err) {
            assert.ok(false, 'Should not have erred');
        }
    });
    it('load-stylesheets erring (ignoring callback)', async () => {
        setUp();
        expect(2);
        const stylesheet1 = 'styles1.css';
        const badStylesheet = 'styles-nonexisting.css';

        const testElement = document.createElement('div');
        testElement.className = 'test';
        testElement.append('testing...');
        // document.body.append(testElement);

        try {
            await loadStylesheets([stylesheet1, badStylesheet], {
                acceptErrors ({stylesheetURL, options, resolve, reject}) {
                    assert.ok(
                        stylesheetURL === badStylesheet,
                        'Should report bad stylesheet to callback; found: ' +
                          stylesheetURL
                    );
                    resolve();
                }
            });
            assert.ok(
                true, 'Should ignore errors after loading bad stylesheet'
            );
        } catch (err) {
            assert.ok(false, 'Should not have erred');
        }
    });
    it('favicon', async () => {
        setUp();
        expect(2);

        const favicon1 = 'favicon.ico';

        try {
            const [f1] = await loadStylesheets(favicon1, {favicon: true});
            assert.strictEqual(f1.nodeName.toLowerCase(), 'link');
            assert.strictEqual(f1.getAttribute('type'), 'image/x-icon');
        } catch (err) {
            assert.ok(false, 'Error loading stylesheets');
        }
    });
    it('favicon and stylesheets', async () => {
        setUp();
        expect(6);

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
            const [s1, f1] = await loadStylesheets([
                stylesheet1,
                [favicon1, {favicon: true}]
            ]);
            const computedStyles = window.getComputedStyle(testElement);
            assert.strictEqual(s1.nodeName.toLowerCase(), 'link');
            assert.strictEqual(s1.getAttribute('href'), stylesheet1);
            assert.strictEqual(computedStyles.color, blueRGB);
            assert.strictEqual(computedStyles.backgroundColor, noRGB);

            assert.strictEqual(f1.nodeName.toLowerCase(), 'link');
            assert.strictEqual(f1.getAttribute('type'), 'image/x-icon');
        } catch (err) {
            assert.ok(false, 'Error loading stylesheets');
        }
    });
});
}());

mocha.run();
