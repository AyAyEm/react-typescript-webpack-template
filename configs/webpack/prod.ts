import fs from 'fs';
import path, { resolve } from 'path';
import { merge } from 'webpack-merge';

import getPublicUrlOrPath from 'react-dev-utils/getPublicUrlOrPath';

import CopyPlugin from 'copy-webpack-plugin';
import commonConfig from './common';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

process.env.NODE_ENV = 'production';
export const prodConfig = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: getPublicUrlOrPath(
      false,
      // eslint-disable-next-line import/no-dynamic-require, global-require
      (require(resolveApp('package.json')) as any).homepage,
      process.env.PUBLIC_URL,
    ),
  },
  devtool: 'source-map',
  plugins: [new CopyPlugin({
    patterns: [
      '../public',
    ],
  })],
});
export default prodConfig;
