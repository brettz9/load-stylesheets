import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';

function getRollupObject ({minifying, format = 'umd'} = {}) {
    const nonMinified = {
        input: 'src/index.js',
        output: {
            format,
            sourcemap: minifying,
            file: `dist/index-${format}${minifying ? '.min' : ''}.js`,
            name: 'loadStylesheets'
        },
        plugins: [
            babel()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

export default [
    getRollupObject(),
    getRollupObject({minifying: true}),
    getRollupObject({minifying: true, format: 'es'}),
    getRollupObject({minifying: false, format: 'es'})
];
