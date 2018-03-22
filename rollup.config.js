import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';

function getRollupObject ({minifying, format = 'umd'} = {}) {
    const nonMinified = {
        input: 'src/index.js',
        output: {
            format,
            file: `dist/index-${format}${minifying ? '.min' : ''}.js`,
            name: 'loadStylesheets'
        },
        plugins: [
            babel()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(uglify(null, minify));
    }
    return nonMinified;
};

export default [
    getRollupObject(),
    getRollupObject({minifying: true}),
    getRollupObject({minifying: true, format: 'es'}),
    getRollupObject({minifying: false, format: 'es'})
];
