const CourseModule = require("../models/Coursemodule");
const Course = require("../models/Courses");

// Add New Course Module
exports.addCourseModule = async (req, res) => {
  try {
    const newModule = await CourseModule.create({
      course_id: req.body.course_id,
      modulename: req.body.modulename,
    });
    res.status(201).json(newModule);
  } catch (err) {
    console.error("Error creating module:", err);
    res.status(500).json({ error: "Failed to create module" });
  }
};

// Get All Course Modules
exports.getCourseModules = async (req, res) => {
  try {
    const courseModules = await CourseModule.find().populate("course_id", "course_name");
    res.status(200).json(courseModules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Course Module by ID
exports.getCourseModuleById = async (req, res) => {
  try {
    const courseModule = await CourseModule.findById(req.params.id).populate("course_id", "course_name");
    if (!courseModule) return res.status(404).json({ message: "Course module not found" });

    res.status(200).json(courseModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Course Module
exports.updateCourseModule = async (req, res) => {
  try {
    const updatedCourseModule = await CourseModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourseModule) return res.status(404).json({ message: "Course module not found" });

    res.status(200).json({ message: "Course module updated successfully", courseModule: updatedCourseModule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Course Module
exports.deleteCourseModule = async (req, res) => {
  try {
    const deletedCourseModule = await CourseModule.findByIdAndDelete(req.params.id);
    if (!deletedCourseModule) return res.status(404).json({ message: "Course module not found" });

    res.status(200).json({ message: "Course module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
