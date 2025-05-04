const express = require("express");
const router = express.Router();
const { addModuleLesson, getModuleLessons, getModuleLessonById, updateModuleLesson, deleteModuleLesson } = require("../controllers/modulelessonsController");

// Create Module Lesson
router.post("/add", addModuleLesson);

// Get All Module Lessons
router.get("/all", getModuleLessons);

// Get Module Lesson by ID
router.get("/:id", getModuleLessonById);

// Update Module Lesson
router.put("/:id", updateModuleLesson);

// Delete Module Lesson
router.delete("/:id", deleteModuleLesson);

module.exports = router;
