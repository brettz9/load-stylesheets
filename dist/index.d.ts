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
export default function loadStylesheets(stylesheets: string | string[], { before: beforeDefault, after: afterDefault, favicon: faviconDefault, canvas: canvasDefault, image: imageDefault, acceptErrors }?: {
    before?: HTMLElement;
    after?: HTMLElement;
    favicon?: boolean;
    image?: boolean;
    canvas?: boolean;
    acceptErrors?: boolean | ((info: {
        error: ErrorEvent;
        stylesheetURL: string;
        options: {};
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
    }) => (reason?: any) => void);
}): Promise<HTMLLinkElement[]>;
//# sourceMappingURL=index.d.ts.map