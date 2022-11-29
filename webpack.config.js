const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 개발 모드
  mode: process.env.MODE,
  // 번들링 결과
  output: {
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // 옵션 번들링
  module: {
    rules: [
      // test에 load할 파일을 지정하고 use에 사용할 모듈 작성
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    // 빌드할 때마다 이전 번들 파일 지우기
    new CleanWebpackPlugin(),
    // 번들한 css, js 파일을 html 파일에 link, script로 추가
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new webpack.DefinePlugin({
      mode: process.env.MODE,
      port: process.env.PORT,
    }),
  ],
  devServer: {
    host: "localhost",
    port: process.env.PORT,
    open: true,
  },
};
