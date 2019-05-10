// Check if user is logged in

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/google');
	} else {
		next();
	}
};

module.exports = authCheck;
