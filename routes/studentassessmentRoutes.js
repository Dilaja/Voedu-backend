const express = require("express");
const router = express.Router();
const { addAssessment, getAssessments, getAssessmentById, updateAssessment, deleteAssessment ,getAssessmentsByStudentId,getstudentAssessment} = require("../controllers/studentassessmentController");


router.post("/add", addAssessment);
router.get("/all", getAssessments);
router.get("/student/:studentId", getAssessmentsByStudentId);
router.get("/assessment/:studentId/:courseId", getstudentAssessment);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

module.exports = router;
