const express = require('express')

const router = express.Router()

const {getAssignment, getAllAssignments, createAssignment, updateAssignment, deleteAssignment, getPendingAssignments, getCompletedAssignments, getMissedAssignments} = require("../controllers/assignments")

router.route('/').post(createAssignment).get(getAllAssignments)
router.route('/pending').get(getPendingAssignments)
router.route('/missed').get(getMissedAssignments)
router.route('/completed').get(getCompletedAssignments)
router.route('/update/:id').get(getAssignment).delete(deleteAssignment).patch(updateAssignment)

module.exports = router

