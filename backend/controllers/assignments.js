const Assignment = require('../models/Assignment')

const { StatusCodes } = require('http-status-codes')

const { BadRequestError, NotFoundError } = require('../errors')

const getAllAssignments = async (req, res) => {
	console.log("Inside get all assignments")
	const assignments = await Assignment.find({ createdBy: req.user.userID }).sort('createdAt')
	console.log("Assignments: ", assignments)
	res.status(StatusCodes.OK).json({ count: assignments.length, assignments })
}

const getPendingAssignments = async (req, res) => {
	console.log("Inside get pending assignments")
	const uncompletedAssignments = await Assignment.find({ createdBy: req.user.userID, completed: false }).sort('createdAt')
	const pendingAssignments = uncompletedAssignments.filter((element) => element.submissionDate > Date.now())
	res.status(StatusCodes.OK).json({ count: pendingAssignments.length, pendingAssignments })
}

const getMissedAssignments = async (req, res) => {
	console.log("Inside get missed assignments")
	const uncompletedAssignments = await Assignment.find({ createdBy: req.user.userID, completed: false }).sort('createdAt')
	const missedAssignments = uncompletedAssignments.filter((element) => element.submissionDate < Date.now())
	res.status(StatusCodes.OK).json({ count: missedAssignments.length, missedAssignments })
}

const getCompletedAssignments = async (req, res) => {
	console.log("Inside get completed assignments")
	const completedAssignments = await Assignment.find({ createdBy: req.user.userID, completed: true })
	res.status(StatusCodes.OK).json({ count: completedAssignments.length, completedAssignments })
}

const createAssignment = async (req, res) => {
	console.log("Inside create assignments")
	req.body.createdBy = req.user.userID
	console.log(req.body)
	const assignment = await Assignment.create(req.body)
	console.log(assignment)
	res.status(StatusCodes.CREATED).json({ assignment })
}

const getAssignment = async (req, res) => {
	console.log("Inside get assignment")
	const { user: { userID }, params: { id: assignmentID } } = req
	// console.log(userID, assignmentID)
	const assignment = await Assignment.findOne({
		_id: assignmentID,
		createdBy: userID
	})
	if (!assignment) {
		throw new NotFoundError('No assignment found')
	}
	res.status(StatusCodes.OK).json({ assignment })
}

const updateAssignment = async (req, res) => {
	console.log("Inside update assignment")
	const { user: { userID }, params: { id: assignmentID }, body: { } } = req
	const assignment = await Assignment.findByIdAndUpdate({ _id: assignmentID, createdBy: userID }, req.body, { new: true, runValidators: true })
	if (!assignment) {
		throw new NotFoundError('No Assignment Found')
	}
	res.status(StatusCodes.OK).json({ assignment })
}

const deleteAssignment = async (req, res) => {
	console.log("Inside delete assignment")
	const { user: { userID }, params: { id: assignmentID } } = req
	const assignment = await Assignment.findOneAndDelete({
		_id: assignmentID,
		createdBy: userID,
	})
	if (!assignment) {
		throw new NotFoundError('No assignment Found')
	}
	res.status(StatusCodes.OK).json({ assignment })
}
module.exports = {
	getAllAssignments,
	getAssignment,
	createAssignment,
	updateAssignment,
	deleteAssignment,
	getPendingAssignments,
	getCompletedAssignments,
	getMissedAssignments,
}
