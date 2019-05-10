const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	googleID: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	rollNo: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	},
	addedTo: [
		{
			type: Schema.Types.ObjectId,
			ref: 'list'
		}
	]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
