module.exports = {
    context: __dirname + "/js/src",
    entry: './index.jsx',
    output: {
	path: __dirname + '/js',
	filename: 'bundle.js', //this is the default name, so you can skip it
    },
    module: {
	loaders: [
	    //tell webpack to use babel-loader for all *.jsx files
	    { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"}
	]
    },
    externals: {
	//don't bundle the 'react' npm package with our bundle.js
	//but get it from a global 'React' variable
	'react': 'React',
	'd3': 'd3',
        'jquery': "jQuery",
        'lodash': "_"
    },
    resolve: {
	root: [__dirname + '/js/lib/', __dirname + '/js/lib/indyva-js/'],
	extensions: ['', '.js', '.jsx']
    }
};
