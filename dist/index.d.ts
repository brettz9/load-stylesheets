/**
 * @param {string[]} stylesheets
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
export default function loadStylesheets(stylesheets: string[], { before: beforeDefault, after: afterDefault, favicon: faviconDefault, canvas: canvasDefault, image: imageDefault, acceptErrors }?: {
    before?: HTMLElement | undefined;
    after?: HTMLElement | undefined;
    favicon?: boolean | undefined;
    image?: boolean | undefined;
    canvas?: boolean | undefined;
    acceptErrors?: boolean | ((info: {
        error: ErrorEvent;
        stylesheetURL: string;
        options: {};
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
    }) => (reason?: any) => void) | undefined;
}): Promise<HTMLLinkElement[]>;
//# sourceMappingURL=index.d.ts.map