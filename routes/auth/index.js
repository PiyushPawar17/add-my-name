const router = require('express').Router();
const passport = require('passport');

// Routes for /auth

// --- GET Requests ---

// Route -> /auth/google
// Google auth route
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
	})
);

// Route -> /auth/google/redirect
// Callback route for Google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/');
});

// Route -> /auth/logout
// Logs out user
router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
