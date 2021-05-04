var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
console.log('path', path.resolve(__dirname, './src'))
module.exports = {
    mode: 'development',
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            root: path.resolve(__dirname, './src'),
          },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000',
            listUrl: 'https://next.json-generator.com'
        })
    }
}