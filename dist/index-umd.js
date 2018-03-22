(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.loadStylesheets = factory());
}(this, (function () { 'use strict';

    function loadStylesheets(stylesheets, { before } = {}) {
        stylesheets = Array.isArray(stylesheets) ? stylesheets : [stylesheets];

        function addLink(stylesheetURL) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylesheetURL;

            if (before) {
                before.before(link);
            } else {
                document.head.appendChild(link);
            }
            return new Promise((resolve, reject) => {
                link.addEventListener('error', error => {
                    reject(error);
                });
                link.addEventListener('load', () => {
                    resolve(link);
                });
            });
        }

        return Promise.all(stylesheets.map(addLink));
    }

    return loadStylesheets;

})));
