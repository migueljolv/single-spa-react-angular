import { container } from 'webpack';
const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:9001/',
    uniqueName: 'angular_app',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    port: 9001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'angular_app',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './App': './src/single-spa',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        '@angular/core': { singleton: true, eager: true },
        '@angular/common': { singleton: true, eager: true },
        '@angular/router': { singleton: true, eager: true },
        '@ngxs/store': { singleton: true, eager: true },
      },
    }),
  ],
};
