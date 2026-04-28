// import nodeResolve from 'rollup-plugin-node-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
// import css from 'rollup-plugin-css-only';
import VuePlugin from 'rollup-plugin-vue';
import typescriptPlugin from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
// import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import commonjs from '@rollup/plugin-commonjs';
// import scss from 'rollup-plugin-scss';
import path from 'path';

const pkgInfo = require('./package.json');

const production = !process.env.ROLLUP_WATCH;
const DEPLOYMENT_RELEASE_DATE = new Date().toISOString().split('T');
console.log(JSON.stringify(DEPLOYMENT_RELEASE_DATE));

const banner = `
/**
 * ${pkgInfo.name} v${pkgInfo.version}
 * Copyright © ${new Date().getFullYear()} Tencent. All Rights Reserved.
 * @license ${pkgInfo.license}
 */
`;

const defaults = { compilerOptions: { declaration: true } };
const override = { compilerOptions: { declaration: false } };

const plugins = [
  nodeResolve({}),
  // commonjs(),
  VuePlugin({
    // preprocessStyles: true,
    // cssModulesOptions: {
    //   preprocessorOptions: {
    //     scss: {
    //       charset: false,
    //     },
    //   },
    // },
    // preprocessOptions: {
    //   charset: false,
    //   // preprocessLang: 'scss',
    //   preprocessOptions: {
    //     scss: {
    //       charset: false,
    //     },
    //     charset: false,
    //   },
    // },
    // postcssOptions: {
    //   plugins: [
    //     {
    //       postcssPlugin: 'internal:charset-removal',
    //       AtRule: {
    //         charset: (atRule) => {
    //           if (atRule.name === 'charset') {
    //             atRule.remove();
    //           }
    //         },
    //       },
    //     },
    //   ],
    // },
    postcssPlugins: [
      {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          },
        },
      },
    ],
    // preprocessorOptions: {
    //   scss: {
    //     charset: false,
    //   },
    // },
  }),
  commonjs(),
  // typescriptPlugin(),
  // typescriptPlugin({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),
  typescriptPlugin({
    // tsconfigDefaults: defaults,
    emitDeclarationOnly: true,
    tsconfig: 'tsconfig.json',
    // tsconfigOverride: override,
  }),
  postcss({
    extract: path.resolve('dist/delta-ui.css'),
    plugins: [
      tailwindcss('./tailwind.config.js'),
      autoprefixer({
        cascade: false,
      }),
    ],
  }),
  json(),
  replace({
    __VERSION__: pkgInfo.version,
    'process.env.DEPLOYMENT_CODE_NAME': JSON.stringify(pkgInfo.name),
    'process.env.DEPLOYMENT_DESCRIPTION': JSON.stringify(pkgInfo.description),
    'process.env.DEPLOYMENT_VERSION': JSON.stringify(pkgInfo.version),
    'process.env.DEPLOYMENT_RELEASE_DATE': JSON.stringify(DEPLOYMENT_RELEASE_DATE[0]),
    'process.env.DEPLOYMENT_RELEASE_TIME': JSON.stringify(DEPLOYMENT_RELEASE_DATE[1]),
    'process.env.DEPLOYMENT_COPYRIGHT': JSON.stringify(
      `Copyright © ${new Date().getFullYear()} Tencent. All Rights Reserved.`,
    ),
  }),
  production && terser(),
];
const dependencies = production ? Object.keys(pkgInfo.dependencies) : [];

export default [
  {
    input: 'src/index.ts',
    external: dependencies,
    output: [
      {
        file: pkgInfo.main,
        format: 'cjs',
        banner,
        exports: 'named',
        name: 'deltaUI',
      },
      {
        file: pkgInfo.browser,
        format: 'umd',
        banner,
        exports: 'named',
        name: 'deltaUI',
        globals: {
          vue: 'Vue',
        },
      },
      {
        file: pkgInfo.module,
        format: 'es',
        banner,
        exports: 'named',
        name: 'deltaUI',
      },
      // {
      //   // input: "src/index.ts",
      //   output: [{ file: 'dist/delta-ui.d.ts', format: 'es' }],
      //   plugins: [dts()],
      // },
    ],
    plugins,
  },
  // }
];
