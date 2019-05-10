const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');

// eslint-disable-next-line
const mongoose = require('./db/mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/api/users');
const listRoutes = require('./routes/api/lists');
const { cookieKey } = require('./config/keys');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Config
require('./config/passport');

// Cookie Session
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 100,
		keys: [cookieKey]
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set a static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on port ${port}`);
});
