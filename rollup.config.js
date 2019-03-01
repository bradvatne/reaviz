import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss-modules';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      postcss({
        modules: true,
        extract: true,
        writeDefinitions: true,
        plugins: [
          autoprefixer()
        ]
      }),
      typescript(),
      resolve(),
      sourceMaps()
    ]
  }
];
