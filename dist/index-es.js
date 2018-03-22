function loadStylesheets(stylesheets, { before, after, favicon, canvas, image = true } = {}) {
    stylesheets = Array.isArray(stylesheets) ? stylesheets : [stylesheets];

    function setupLink(stylesheetURL) {
        function addLink() {
            if (before) {
                before.before(link);
            } else if (after) {
                after.after(link);
            } else {
                document.head.appendChild(link);
            }
        }

        const link = document.createElement('link');
        return new Promise((resolve, reject) => {
            if (favicon) {
                link.rel = 'shortcut icon';
                link.type = 'image/x-icon';

                if (image === false) {
                    link.href = stylesheetURL;
                    addLink();
                    resolve(link);
                    return;
                }

                const cnv = document.createElement('canvas');
                cnv.width = 16;
                cnv.height = 16;
                const context = cnv.getContext('2d');
                const img = document.createElement('img');
                img.addEventListener('error', error => {
                    reject(error);
                });
                img.addEventListener('load', () => {
                    context.drawImage(img, 0, 0);
                    link.href = canvas ? cnv.toDataURL('image/x-icon') : stylesheetURL;
                    addLink();
                    resolve(link);
                });
                img.src = stylesheetURL;
                return;
            }
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylesheetURL;
            addLink();
            link.addEventListener('error', error => {
                reject(error);
            });
            link.addEventListener('load', () => {
                resolve(link);
            });
        });
    }

    return Promise.all(stylesheets.map(setupLink));
}

export default loadStylesheets;
