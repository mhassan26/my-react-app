const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
  mode: 'development', // or 'production' for optimized builds
  entry: './src/index.js', // Your main entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
    clean:true // clean output directory before every build
  },
  module: { 
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply to .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader for these files
        },
      },
      {
        test: /\.css$/, // Apply to .css files
        use: ['style-loader', 'css-loader'], // Use these loaders
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Enable importing without file extensions
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions:{
            ignore: ['**/index.html'], // Ignore index.html in public folder
          },
          noErrorOnMissing: true
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open:true
  },
};
