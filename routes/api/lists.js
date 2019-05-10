const router = require('express').Router();
const _ = require('lodash');

const authCheck = require('../../utils/authCheck');
const List = require('../../models/List');

// Routes for /api/lists

// List data to be returned
const listData = ['_id', 'title', 'description', 'studentList'];

// --- GET Requests ---

// Route -> /api/lists
// Returns all lists
router.get('/', (req, res) => {
	List.find({})
		.populate('studentList.student', ['name'])
		.sort({ createdAt: -1 })
		.then(allLists => {
			const lists = allLists.map(list => _.pick(list, listData));
			res.json({ lists });
		})
		// eslint-disable-next-line
		.catch(console.log);
});

// --- POST Requests ---

// Route -> /api/lists
// Creates a new list
router.post('/', authCheck, (req, res) => {
	if (!req.user.admin) {
		return res.status(400).json({ error: 'Only Admin can add list' });
	}

	const { title, description } = req.body;

	const newList = new List({ title, description });

	newList
		.save()
		.then(currentList => {
			const list = _.pick(currentList, listData);
			res.json({ list });
		})
		// eslint-disable-next-line
		.catch(console.log);
});

// --- DELETE Requests ---

// Route -> /api/lists/:listID
// Deletes the list
router.delete('/:listID', (req, res) => {
	if (!req.user.admin) {
		return res.status(400).json({ error: 'Only Admin can delete list' });
	}

	const { listID } = req.params;

	List.findByIdAndRemove(listID)
		.then(deletedList => {
			const list = _.pick(deletedList, listData);
			res.json({ list });
		})
		// eslint-disable-next-line
		.catch(console.log);
});

module.exports = router;
