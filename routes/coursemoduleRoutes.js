const express = require("express");
const router = express.Router();
const { addCourseModule, getCourseModules, getCourseModuleById, updateCourseModule, deleteCourseModule } = require("../controllers/coursemoduleController");


router.post("/add", addCourseModule);
router.get("/all", getCourseModules);
router.get("/:id", getCourseModuleById);
router.put("/:id", updateCourseModule);
router.delete("/:id", deleteCourseModule);

module.exports = router;
