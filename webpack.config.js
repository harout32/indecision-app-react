//entry point
const path = require('path');
module.exports = {
  
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },


  //specifying the loaders whenever webpack sees a file ends with .js use babel-loader 
  //and its presets .babelrc file  ,  and exclude node_modules folder
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use:[
        //put the loader css in the style tags
        'style-loader',
        //load the coverted css
        'css-loader',
        //convert scss to css
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}