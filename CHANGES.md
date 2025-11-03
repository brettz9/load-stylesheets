# load-stylesheets

## 0.13.0

- feat(typescript): export `Options` and `Stylesheets`
- feat: support last 2 versions in browserslist
- chore: update devDeps.

## 0.12.5

- fix: help TS find declaration file when from `node_modules` paths

## 0.12.4

- fix: help TS find declaration file when from `node_modules` paths

## 0.12.3

- fix: TS fix

## 0.12.2

- fix: TS fix

## 0.12.1

- fix: TS export

## 0.12.0

### User-facing

- feat: TS types

## 0.11.0

### User-facing

- feat: switch to native ESM (and changing paths to ".cjs" extension)

### Dev-facing

- chore: update devDeps.

## 0.10.0

### User-facing

- npm: Remove `core-js-bundle` peerDep.
- npm: Ignore more hidden files

### Dev-facing

- Dev security (npm): switch to server (http-server) without vulnerabilities
- Build: Update per latest devDeps.
- Build: Use "json" extension for RC
- Linting (ESLint): Apply to any HTML files
- Linting: As per latest ash-nazg / ESLint 7
- Maintenance: Add `.editorconfig`
- npm: Update `rollup-plugin-babel` to `@rollup/plugin-babel`
    and make explicit `babelHelpers` value of `bundled`
- npm: Switch to pnpm
- npm: Separate `open` script
- npm: Update devDeps. including peerDeps for latest ash-nazg

## 0.9.0

- Linting: Switch to ash-nazg; lint markdown; fix in eslintrc
- Testing: Add favicon no-op
- npm: Update devDeps; remote peerDep

## 0.8.0

- Linting (ESLint): Change to avoid deprecated `.eslintrc` without extension
    (add `.js`)
- Linting (ESLint): Override new "standard" rule
- Linting (LGTM): Add `lgtm.yml`
- npm: Add `core-js-bundle` to peerDependencies and remove `@babel/polyfill`
    devDep in favor of it
- npm: Update opn->open-cli
- npm: Update devDeps; add mocha
- npm: Add to `.npmignore`
- npm: Update devDeps including Babel to 7; remove mocha-puppeteer and
    unneeded rollup plugins; move from uglify to terser
- Docs: Add npm, license, lgtm info; update README (@jhabdas)

## 0.7.0

- Fix: Avoid possible recursion with `acceptErrors`
- npm: Update devDeps

## 0.6.1

- Fix: Avoid bundling hidden cache and mocha-puppeteer files

## 0.6.0

- npm: Update devDeps; do security audit fix
- Docs: Mention `fetch-inject`
- Testing: Switch from deprecated nodeunit to Mocha/Chai; also add puppeteer

## 0.5.0

- Enhancement: `acceptErrors` boolean or callback

## 0.4.0

- Enhancement: Allow overriding of defaults by supplying two-item array
    (stylesheet and options) within array
- Enhancement: Avoid treating ".css" as favicon even if `favicon` config
    set to true
- LICENSE: Add missing license copy (MIT)

## 0.3.0

- Enhancement: Avoid need for `favicon: true` option if URL ends with `.ico`.

## 0.2.0

- Enhancement: Allow favicon loading
- Enhancement: Add `after` option
- Testing: Fix single stylesheet test (only one color should be applied)

## 0.1.1

- npm fix: Ensure `main` is correct
- npm enhancement: Add `module`

## 0.1.0

- Initial commit
