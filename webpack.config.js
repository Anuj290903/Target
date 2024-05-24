const path = require('path');

module.exports = {
  mode: 'development',
  entry: './mainApp/static/Admin-Front/src/main.jsx',
  output: {
    filename: 'Compile.js',
    path: path.resolve(__dirname, 'mainApp/static/Admin-Front/src/'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
};
