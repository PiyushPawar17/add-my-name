const router = require('express').Router();
const _ = require('lodash');

const authCheck = require('../../utils/authCheck');
const User = require('../../models/User');
const List = require('../../models/List');

// Routes for /api/users

// User data to be returned
const userData = ['_id', 'name', 'email', 'rollNo', 'admin', 'addedTo'];
// List data to be returned
const listData = ['_id', 'title', 'description', 'studentList'];

// --- GET Requests ---

// Route -> /api/users/me
// Returns current user
router.get('/me', (req, res) => {
	if (req.user) {
		User.findById(req.user.id)
			.then(currentUser => {
				const user = _.pick(currentUser, userData);
				res.json({ user });
			})
			// eslint-disable-next-line
			.catch(console.log);
	} else {
		res.json({ user: null });
	}
});

// --- POST Requests ---

// Route -> /api/users/:listID
// Adds the name to the list
router.post('/:listID', authCheck, (req, res) => {
	const { listID } = req.params;
	const { comment } = req.body;

	const student = {
		student: req.user.id,
		comment
	};

	List.findByIdAndUpdate(listID, { $addToSet: { studentList: student } }, { new: true })
		.populate('studentList.student', ['name'])
		.then(updatedList => {
			const list = _.pick(updatedList, listData);

			User.findByIdAndUpdate(req.user.id, { $addToSet: { addedTo: listID } }, { new: true })
				.then(updatedUser => {
					const user = _.pick(updatedUser, userData);

					res.json({ user, list });
				})
				// eslint-disable-next-line
				.catch(console.log);
		})
		// eslint-disable-next-line
		.catch(console.log);
});

// --- DELETE Requests ---

// Route -> /api/users/:listID
// Removes the name from the list
router.delete('/:listID', authCheck, (req, res) => {
	const { listID } = req.params;

	List.findByIdAndUpdate(listID, { $pull: { studentList: { student: req.user.id } } }, { new: true })
		.populate('studentList.student', ['name'])
		.then(updatedList => {
			const list = _.pick(updatedList, listData);

			User.findByIdAndUpdate(req.user.id, { $pull: { addedTo: listID } }, { new: true })
				.then(updatedUser => {
					const user = _.pick(updatedUser, userData);

					res.json({ user, list });
				})
				// eslint-disable-next-line
				.catch(console.log);
		})
		// eslint-disable-next-line
		.catch(console.log);
});

module.exports = router;
