const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "./docs/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                minimize: true
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./docs/fonts/"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./docs/images/"
            }
          },
          "image-webpack-loader"
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("docs/bundle.css"),
    new UglifyJSPlugin()
  ]
}
