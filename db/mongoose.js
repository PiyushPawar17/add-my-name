const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

mongoose.Promise = global.Promise;

mongoose
	.connect(mongoURI, { useNewUrlParser: true })
	.then(() => {
		// eslint-disable-next-line
		console.log('MongoDB Connected');
	})
	.catch(err => {
		// eslint-disable-next-line
		console.log(err);
	});

module.exports = mongoose;
