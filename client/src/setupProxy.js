const proxy = require('http-proxy-middleware');

if (process.env.NODE_ENV === 'production') {
	module.exports = function(app) {
		app.use(proxy('/auth', { target: 'url' }));
		app.use(proxy('/api', { target: 'url' }));
	};
} else {
	module.exports = function(app) {
		app.use(proxy('/auth', { target: 'http://localhost:5000/' }));
		app.use(proxy('/api', { target: 'http://localhost:5000/' }));
	};
}
