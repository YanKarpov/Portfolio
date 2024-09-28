const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/styles.css', to: 'styles.css' }, // копируем файл стилей
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                },
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            },
        ],
    },
    devServer: {
        static: './dist',
        open: true, 
    },
};

