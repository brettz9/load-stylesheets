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
 * @typedef {string|
 *   (string|[stylesheetURL: string, options: Options])[]} Stylesheets
 */
/**
 * @param {Stylesheets} stylesheets
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
export default function loadStylesheets(stylesheets: Stylesheets, { before: beforeDefault, after: afterDefault, favicon: faviconDefault, canvas: canvasDefault, image: imageDefault, acceptErrors }?: {
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
export type Options = {
    before?: HTMLElement;
    after?: HTMLElement;
    favicon?: boolean;
    image?: boolean;
    canvas?: boolean;
};
export type Stylesheets = string | (string | [stylesheetURL: string, options: Options])[];
//# sourceMappingURL=index.d.ts.map