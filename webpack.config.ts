import { Configuration } from "webpack";
import { resolve } from "path";

export default () => {
  const config: Configuration = {
    entry: "./src/index.ts",
    output: {
      filename: "index.js",
      path: resolve(__dirname, "./lib")
    },
    mode: "production",
    // devtool: "source-map",
    target: "node",
    resolve: {
      extensions: [".js", ".ts", ".json"]
    },
    node: {
      fs: true,
      net: true,
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    }
  };

  return config;
};
