const mongoose = require('mongoose')

const RevisionSchema = new mongoose.Schema({
	subject: {
		type: String,
		maxlength: 50,
	},
	revisionTitle: {
		type: String,
		maxlength: 200,
		required: true
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	currentCount: {
		type: Number,
		default: 0,
	},
	actualCount: {
		type: Number,
		default: 0,
	},
	nextRevision: {
		type: Number,
		default: 1,
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
})

module.exports = mongoose.model('Revision', RevisionSchema)
