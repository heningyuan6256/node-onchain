// webpack.config.js

import path from 'path'

module.exports = {
  target: "node",
  entry: "./src/index.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 输出文件名
  },
};
