const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        app: './App.js'
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build'
    },
    watch: NODE_ENV === 'development',
    module: {
        rules: [
            {
                test: /\.js/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader?presets[]=es2015',
            }
        ]
    }
};