const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: `./src/index.js`,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.png"
        }),
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
              },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            }, 
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                css: {
                    test: /\.(css|sass|scss)$/,
                    name: 'todo',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
}

module.exports = (env, argv) => {
    switch(argv.mode) {
        case 'development':
            config.mode = 'development';
            config.devtool = 'source-map';
            config.devServer = {
                port: 3000,
                static: ["./dist"],
                hot: true,
                open: true,
                liveReload: true
            };
            break;
        default:
            config.mode = 'production';
    }
    return config;
}
