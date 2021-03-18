const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    target: 'node',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              }
        ]
    },

    externals: nodeExternals({
        allowlist: [/\.css$/, /\?vue&type=style/]
    }),

    plugins: [
        new VueLoaderPlugin()
    ]
}