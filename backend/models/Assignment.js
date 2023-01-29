const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
	subject: {
		type: String,
		maxlength: 50,
		required: false,
	},
	assignmentTitle: {
		type: String,
		maxlength: 200,
		required: true,
		unique:true,
	},
	assignmentURL: {
		type: String,
		maxlength: 200,
		required: false,
	},
	submissionDate: {
		type: Date,
		default: () => Date.now() + 5 * 24 * 60 * 60 * 1000
	},
	reminderDate: {
		type: Date,
		default: () => Date.now() + 24 * 60 * 60 * 1000
	},
	createdAt: {
		type: Date,
		default: () => Date.now()
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user.']
	}
}, { timestamps: true })

module.exports = mongoose.model('Assignment', AssignmentSchema)
