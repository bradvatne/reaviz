const { resolve } = require('path');
const postcssFocusVisible = require('postcss-focus-visible');
const autoprefixer = require('autoprefixer');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = async ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)$/,
        include: resolve(__dirname, '../src'),
        use: [
          require.resolve('babel-loader'),
          require.resolve("react-docgen-typescript-loader")
        ]
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: resolve(__dirname, '../')
      },
      {
        test: sassModuleRegex,
        include: resolve(__dirname, '../'),
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009'
                }),
                postcssFocusVisible()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: config.plugins,
  resolve: {
    ...config.resolve,
    modules: [
      ...config.resolve.modules,
      resolve(__dirname, '../src')
    ],
    extensions: [...config.resolve.extensions, '.ts', '.tsx'],
  },
});
