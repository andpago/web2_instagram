const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker')

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: NODE_ENV,
    entry: {
        testBundle: './test',
        indexBundle: './index',
        // testRedux: './testRedux',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build/',
        library: '[name]',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            '$':          'jquery',
            'React':      'react',
            'ReactDOM':   'react-dom',
            'Grid': 'react-flexbox-grid',
            'Row': 'react-flexbox-grid',
            'Col': 'react-flexbox-grid',
          })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader?presets[]=react&presets[]=env&presets[]=stage-1',
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader?modules',
              include: /flexboxgrid/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /flexboxgrid/
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
                exclude: /flexboxgrid/
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
};



if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: true,
        //         unsafe: true,
        //     },
        // })
    );
}