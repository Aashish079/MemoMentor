const express = require('express')

const router = express.Router()

const {getRevision, getAllRevisions, createRevision, updateRevision, deleteRevision, getUpcomingRevisions, getTodayRevisions, getCompletedRevisions} = require("../controllers/revisions")

router.route('/').post(createRevision).get(getAllRevisions)
router.route('/upcoming').get(getUpcomingRevisions)
router.route('/today').get(getTodayRevisions)
router.route('/completed').get(getTodayRevisions)
router.route('/update/:id').get(getRevision).delete(deleteRevision).patch(updateRevision)

module.exports = router
