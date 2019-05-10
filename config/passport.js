const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const { clientID, clientSecret } = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			// Options
			callbackURL: '/auth/google/redirect',
			clientID,
			clientSecret
		},
		(accessToken, refreshToken, profile, done) => {
			// Callback
			// Check if user exist
			User.findOne({ googleID: profile.id }).then(currentUser => {
				if (currentUser) {
					// User exist
					done(null, currentUser);
				} else {
					// Create new user
					const rollNo = profile.emails[0].value.split('@')[0];
					const admin = rollNo === '201651040';

					const newUser = new User({
						name: profile.displayName,
						googleID: profile.id,
						email: profile.emails[0].value,
						rollNo,
						admin
					});

					newUser.save().then(user => {
						done(null, user);
					});
				}
			});
		}
	)
);
