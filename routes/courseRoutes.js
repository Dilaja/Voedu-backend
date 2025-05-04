const express = require("express");
const router = express.Router();
const { addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse,getModulesByCourse,
    getLessonsByModule,getCoursemodule }  = require("../controllers/courseController");

// Course routes
router.post("/add", addCourse);
router.get("/all", getAllCourses);
router.get("/modules", getCoursemodule);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
// Modules for course
router.get("/courses/:courseId/modules", getModulesByCourse);

// Lessons for module
router.get("/modules/:moduleId/lessons", getLessonsByModule);

module.exports = router;
