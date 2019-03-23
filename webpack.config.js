/* eslint-disable no-undef */
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const webpack = require('webpack');

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        sideEffects: true,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          //          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader!sass-loader'], // <style lang="scss">
            sass: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader!sass-loader?indentedSyntax'] // <style lang="sass">
          },
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          //outputPath: 'js'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'styles': path.resolve(__dirname, './src/styles/'),
      'assets': path.resolve(__dirname, './src/assets/'),
      'pages': path.resolve(__dirname, './src/pages/'),
      'components': path.resolve(__dirname, './src/components/')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    contentBase: './dist'
  },
  performance: {
    hints: false
  },
  //devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin()
  ]
}

if (devMode){
  module.exports.devServer = {
    //contentBase: './dist',
    publicPath: '/dist/',
    filename: 'bundle.js',
    writeToDisk: false
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.output.filename = "js/[name].[chunkhash].js";
  module.exports.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendors"
        },
        styles: {
          name: 'styles',
          test: /\.s?css|vue$/,
          chunks: 'all',
          enforce: true
        }
      }
    },

    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  };

  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      title: 'Production',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
      //      chunkFilename: devMode ? '[id].css' : 'css/[id].[hash].css',
    }),
  ]);


  // module.exports.devtool = '#source-map'
  // // http://vue-loader.vuejs.org/en/workflow/production.html
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   }),
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: true
  //   })
  // ])
}
