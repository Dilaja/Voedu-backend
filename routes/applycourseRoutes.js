const express = require("express");
const router = express.Router();
const { addApplyCourse, getApplyCourses, getApplyCourseById, updateApplyCourse, deleteApplyCourse } = require("../controllers/applycourseController");


router.post("/apply", addApplyCourse);
router.get("/all", getApplyCourses);
router.get("/:id", getApplyCourseById);
router.put("/:id", updateApplyCourse);
router.delete("/:id", deleteApplyCourse);

module.exports = router;
