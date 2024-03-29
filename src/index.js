/**
 * @param {string|string[]} stylesheets
 * @param {{
 *   before?: HTMLElement,
 *   after?: HTMLElement,
 *   favicon?: boolean,
 *   image?: boolean,
 *   canvas?: boolean,
 *   acceptErrors?: boolean|((info: {
 *     error: ErrorEvent,
 *     stylesheetURL: string,
 *     options: {},
 *     resolve: (value: any) => void,
 *     reject: (reason?: any) => void
 *   }) => (reason?: any) => void)
 * }} cfg
 * @returns {Promise<HTMLLinkElement[]>}
 */
export default function loadStylesheets (stylesheets, {
  before: beforeDefault, after: afterDefault, favicon: faviconDefault,
  canvas: canvasDefault, image: imageDefault = true,
  acceptErrors
} = {}) {
  stylesheets = Array.isArray(stylesheets) ? stylesheets : [stylesheets];

  /**
   * @typedef {{
   *   before?: HTMLElement,
   *   after?: HTMLElement,
   *   favicon?: boolean,
   *   image?: boolean,
   *   canvas?: boolean,
   * }} Options
   */

  /**
   * @param {string|[stylesheetURL: string, options: Options]} stylesheetURLInfo
   * @returns {Promise<HTMLLinkElement>}
   */
  function setupLink (stylesheetURLInfo) {
    /** @type {Options} */
    let options = {};

    /** @type {string} */
    let stylesheetURL;
    if (Array.isArray(stylesheetURLInfo)) {
      ([stylesheetURL, options = {}] = stylesheetURLInfo);
    } else {
      stylesheetURL = stylesheetURLInfo;
    }
    let {favicon = faviconDefault} = options;
    const {
      before = beforeDefault,
      after = afterDefault,
      canvas = canvasDefault,
      image = imageDefault
    } = options;
    function addLink () {
      if (before) {
        before.before(link);
      } else if (after) {
        after.after(link);
      } else {
        document.head.append(link);
      }
    }

    const link = document.createElement('link');

    // eslint-disable-next-line promise/avoid-new -- No native option
    return new Promise((resolve, reject) => {
      let rej = reject;
      if (acceptErrors) {
        rej = typeof acceptErrors === 'function'
          ? (error) => {
            acceptErrors({
              error, stylesheetURL, options, resolve, reject
            });
          }
          : resolve;
      }
      if (stylesheetURL.endsWith('.css')) {
        favicon = false;
      } else if (stylesheetURL.endsWith('.ico')) {
        favicon = true;
      }
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
        // eslint-disable-next-line promise/prefer-await-to-callbacks -- No API
        img.addEventListener('error', (error) => {
          reject(error);
        });
        img.addEventListener('load', () => {
          if (!context) {
            throw new Error('Canvas context could not be found');
          }
          context.drawImage(img, 0, 0);
          link.href = canvas
            ? cnv.toDataURL('image/x-icon')
            : stylesheetURL;
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
      // eslint-disable-next-line promise/prefer-await-to-callbacks -- No API
      link.addEventListener('error', (error) => {
        rej(error);
      });
      link.addEventListener('load', () => {
        resolve(link);
      });
    });
  }

  return Promise.all(
    stylesheets.map((stylesheetURL) => setupLink(stylesheetURL))
  );
}
