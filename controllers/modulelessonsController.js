const ModuleLesson = require("../models/Modulelesson");
const CourseModule = require("../models/Coursemodule");

// Add New Module Lesson
exports.addModuleLesson = async (req, res) => {
  try {
    const newLesson = await ModuleLesson.create({
      module_id: req.body.module_id,
      lessontitle: req.body.lessontitle,
    });
    res.status(201).json(newLesson);
  } catch (err) {
    console.error("Error creating lesson:", err);
    res.status(500).json({ error: "Failed to create lesson" });
  }
};

// Get All Module Lessons
exports.getModuleLessons = async (req, res) => {
  try {
    const moduleLessons = await ModuleLesson.find().populate("module_id", "modulename");
    res.status(200).json(moduleLessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Module Lesson by ID
exports.getModuleLessonById = async (req, res) => {
  try {
    const moduleLesson = await ModuleLesson.findById(req.params.id).populate("module_id", "modulename");
    if (!moduleLesson) return res.status(404).json({ message: "Module lesson not found" });

    res.status(200).json(moduleLesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Module Lesson
exports.updateModuleLesson = async (req, res) => {
  try {
    const updatedModuleLesson = await ModuleLesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedModuleLesson) return res.status(404).json({ message: "Module lesson not found" });

    res.status(200).json({ message: "Module lesson updated successfully", moduleLesson: updatedModuleLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Module Lesson
exports.deleteModuleLesson = async (req, res) => {
  try {
    const deletedModuleLesson = await ModuleLesson.findByIdAndDelete(req.params.id);
    if (!deletedModuleLesson) return res.status(404).json({ message: "Module lesson not found" });

    res.status(200).json({ message: "Module lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
