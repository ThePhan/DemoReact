var config = {
    entry: './isomorphic/client/router.js',

    output: {
        path: './',
        filename: 'index.js',
    },
    /*webpack-dev-server....
    ......
    */
    // devServer: {
    //     inline: true,
    //     port: 2020
    // },

    //Module bundle
    module: {
        loaders: [{
            // loaders add file have target jsx*....
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}

module.exports = config;
