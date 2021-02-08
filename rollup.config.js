import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: {
        format: 'iife',
        file: 'index.js',
        name: 'DxformSVG'
    },
    plugins: [
        nodeResolve(),
        resolve({
            extensions: ['.ts', '.tsx'],
        }),
        babel({
            extensions: ['.ts', '.tsx'],
            presets: ['@babel/preset-typescript'],
            plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator', [
                    '@babel/plugin-transform-react-jsx',
                    {
                        runtime: 'automatic',
                        importSource: '.',
                    },
                ],
            ],
        })
    ],
}