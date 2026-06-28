const express = require('express');
const {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');

const router = express.Router();

router.route('/').get(getAllAssignments).post(createAssignment);
router.route('/:id').put(updateAssignment).delete(deleteAssignment);

module.exports = router;
