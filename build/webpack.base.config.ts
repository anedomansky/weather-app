import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

const baseConfig: webpack.Configuration = {
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    // disable type checker - use it in fork plugin
                    transpileOnly: true,
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                },
            },
        ],
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

export default baseConfig;
