// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   entry: {
//     app: "./src/index.js",
//   },
//   output: {
//     // filename: "app.js",
//     path: path.resolve(__dirname, "public"),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: [
//           MiniCssExtractPlugin.loader,
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [
//                   [
//                     "postcss-preset-env",
//                     {
//                       // Options
//                     },
//                   ],
//                 ],
//               },
//             },
//           },
//         ],
//       },
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//     ],
//   },
//   plugins: [new MiniCssExtractPlugin()],
// };
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "app.css" }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
    }),
  ],
};
