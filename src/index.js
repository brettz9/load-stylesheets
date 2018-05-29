function addResource ({before, after, element, listen, remove, acceptErrors, stylesheetURL}) {
    let p;
    if (listen) {
        p = new Promise((resolve, reject) => {
            if (acceptErrors) {
                reject = typeof acceptErrors === 'function'
                    ? (error) => {
                        acceptErrors({error, resolve, reject, stylesheetURL});
                    }
                    : resolve;
            }
            const destructor = () => {
                element.removeEventListener('error', onError);
                element.removeEventListener('load', onLoad);
                if (remove) {
                    element.remove();
                }
            };
            const onError = (error) => {
                reject(error);
                destructor();
            };
            const onLoad = () => {
                resolve(element);
                destructor();
            };
            element.addEventListener('error', onError);
            element.addEventListener('load', onLoad);
        });
    }
    if (before) {
        before.before(element);
    } else if (after) {
        after.after(element);
    } else {
        document.head.append(element);
    }
    return p;
}

/**
* @param {string|Array|Promise|Object} urls If an object is passed, may
*                             include options and `url` to indicate the URL
* @param {Object} options If `favicon` or `link` is present, `loadExternals`
*                             will be used (loading as external stylesheet/script)
*/
export const loadResources = async function (urls, {
    autoDetectType: autoDetectTypeDefault = false,
    before: beforeDefault = null,
    after: afterDefault = null,
    remove: removeDefault = false,
    // `loadStylesheets` defaults to pass on:
    favicon: faviconDefault = false,
    canvas: canvasDefault = false,
    image: imageDefault = true,
    acceptErrors: acceptErrorsDefault = false,
    link: linkDefault = false
} = {}) {
    urls = Array.isArray(urls) ? urls : [urls];
    const proms = await Promise.all(
        urls.map(async (url) => {
            let options = {};
            if (Array.isArray(url)) {
                ([url, options = {}] = url);
            } else if (url && typeof url === 'object') {
                if (url.then) {
                    return url;
                }
                ({
                    url,
                    options = {}
                } = url);
            }
            const {
                before = beforeDefault,
                after = afterDefault,
                remove = removeDefault,
                canvas = canvasDefault,
                image = imageDefault,
                acceptErrors = acceptErrorsDefault,
                favicon = faviconDefault,
                link = linkDefault,
                autoDetectType = autoDetectTypeDefault
            } = options;
            if (favicon || link) {
                return {
                    results: loadExternals(url, {
                        before, after, remove, favicon, canvas, image, acceptErrors
                    })
                };
            }
            const res = await fetch(url);
            return Promise.all([
                autoDetectType ? res.clone().text() : res.text(),
                autoDetectType
                    ? res.blob().then((b) => b.type.includes('text/css'))
                    : url.endsWith('.css'),
                before,
                after,
                remove,
                acceptErrors
            ]);
        })
    );
    return Promise.all(proms.map((prom) => {
        // Pass-through other promises including from `loadStylesheets`
        if (!Array.isArray(prom)) {
            if (prom.results) { // Our `loadExternals` from above
                return prom.results.then(r => r[0]);
            }
            // Some other hitch-hiking promise
            return prom;
        }
        const [text, isCSS, before, after, remove, acceptErrors] = prom;
        const elName = isCSS
            ? 'style'
            : 'script';
        const element = document.createElement(elName);
        element.append(text);
        return addResource({before, after, remove, element, listen: true, acceptErrors});
    }));
};

export const loadExternals = function (stylesheets, {
    before: beforeDefault = null,
    after: afterDefault = null,
    remove: removeDefault = false,
    favicon: faviconDefault = false,
    canvas: canvasDefault = false,
    image: imageDefault = true,
    acceptErrors: acceptErrorsDefault = false
} = {}) {
    stylesheets = Array.isArray(stylesheets) ? stylesheets : [stylesheets];

    function setupLink (stylesheetURL) {
        let options = {};
        if (Array.isArray(stylesheetURL)) {
            ([stylesheetURL, options = {}] = stylesheetURL);
        } else if (stylesheetURL && typeof stylesheetURL === 'object') {
            ({
                stylesheetURL = stylesheetURL.stylesheet,
                options = {}
            } = stylesheetURL);
        }
        let {favicon = faviconDefault} = options;
        const {
            before = beforeDefault,
            after = afterDefault,
            remove = removeDefault,
            canvas = canvasDefault,
            image = imageDefault,
            acceptErrors = acceptErrorsDefault
        } = options;

        const link = document.createElement('link');

        if (stylesheetURL.endsWith('.css')) {
            favicon = false;
        } else if (stylesheetURL.endsWith('.ico')) {
            favicon = true;
        }
        if (favicon) {
            link.rel = 'shortcut icon';
            link.type = 'image/x-icon';
            return new Promise((resolve, reject) => {
                if (acceptErrors) {
                    reject = typeof acceptErrors === 'function'
                        ? (error) => {
                            acceptErrors({error, stylesheetURL, options, resolve, reject});
                        }
                        : resolve;
                }
                if (image === false) {
                    link.href = stylesheetURL;
                    addResource({before, after, remove, element: link});
                    resolve(link);
                    return;
                }

                const cnv = document.createElement('canvas');
                cnv.width = 16;
                cnv.height = 16;
                const context = cnv.getContext('2d');
                const img = document.createElement('img');
                img.addEventListener('error', (error) => {
                    reject(error);
                });
                img.addEventListener('load', () => {
                    context.drawImage(img, 0, 0);
                    link.href = canvas
                        ? cnv.toDataURL('image/x-icon')
                        : stylesheetURL;
                    addResource({before, after, remove, element: link});
                    resolve(link);
                });
                img.src = stylesheetURL;
            });
        }
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheetURL;
        return addResource({before, after, remove, element: link, acceptErrors, listen: true, stylesheetURL});
    }

    return Promise.all(
        stylesheets.map(setupLink)
    );
};
