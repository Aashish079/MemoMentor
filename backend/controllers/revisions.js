const Revision = require('../models/Revision')

const { StatusCodes } = require('http-status-codes')

const { BadRequestError, NotFoundError } = require('../errors')

const getAllRevisions = async (req, res) => {
	console.log("Call to get all revisions")
	const revisions = await Revision.find({ createdBy: req.user.userID }).sort('createdAt')
	res.status(StatusCodes.OK).json({ count: revisions.length, revisions })
}

const getCompletedRevisions = async (req, res) => {
	console.log("Call to get completed revision")
	const revisions = await Revision.find({ createdBy: req.user.userID }).sort('createdAt')
	const completedRevisions = revisions.filter((revision) => revision.nextRevision == -1)
	res.status(StatusCodes.OK).json({ count: completedRevisions.length, completedRevisions })
}

const getTodayRevisions = async (req, res) => {
	console.log("Call to get today revision")
	const revisions = await Revision.find({ createdBy: req.user.userID }).sort('createdAt')
	const todayRevisions = revisions.filter((revision) => revision.actualCount == revision.nextRevision)
	res.status(StatusCodes.OK).json({ count: todayRevisions.length, todayRevisions })
}

const getUpcomingRevisions = async (req, res) => {
	console.log("Call to get upcoming revision")
	const revisions = await Revision.find({ createdBy: req.user.userID }).sort('createdAt')
	const upcomingRevisions = revisions.filter((revision) => revision.nextRevision != -1 && revision.actualCount != revision.nextRevision)
	upcomingRevisions.sort((a, b) => (a.nextRevision - a.actualCount) - (b.nextRevision - b.actualCount))
	res.status(StatusCodes.OK).json({ count: upcomingRevisions.length, upcomingRevisions })

}

const createRevision = async (req, res) => {
	console.log("Call to create revision")
	req.body.createdBy = req.user.userID
	const revision = await Revision.create(req.body)
	console.log("Revision: ", revision)
	res.status(StatusCodes.CREATED).json({ revision })
}

const getRevision = async (req, res) => {
	const { user: { userID }, params: { id: revisionID }, body:{} } = req
	const revision = await Revision.findOne({
		_id: revisionID,
		createdBy: userID
	})
	if (!revision) {
		throw new NotFoundError('No revision found')
	}

	res.status(StatusCodes.OK).json({ revision })
}

const updateRevision = async (req, res) => {
	const { user: { userID }, params: { id: revisionID }, body: { } } = req

	const revision = await Revision.findByIdAndUpdate({ _id: revisionID, createdBy: userID }, req.body, { new: true, runValidators: true })

	if (!revision) {
		throw new NotFoundError('No Revision Found')
	}
	res.status(StatusCodes.OK).json({ revision })
}

const deleteRevision = async (req, res) => {
	const { user: { userID }, params: { id: revisionID } } = req
	const revision = await Revision.findOneAndDelete(
		{
			_id: revisionID,
			createdBy: userID,
		}
	)
	if (!revision) {
		throw new NotFoundError('No revision found')
	}
	res.status(StatusCodes.OK).json({ revision })
}
module.exports = {
	getAllRevisions,
	createRevision,
	getRevision,
	updateRevision,
	deleteRevision,
	getCompletedRevisions,
	getTodayRevisions,
	getUpcomingRevisions
}

