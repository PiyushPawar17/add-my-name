const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ListSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	studentList: [
		{
			student: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			},
			comment: {
				type: String
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const List = mongoose.model('list', ListSchema);

module.exports = List;
