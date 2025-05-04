const Course = require("../models/Courses");
const CourseModule = require("../models/Coursemodule");
const ModuleLesson = require("../models/Modulelesson");
// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

exports.getCoursemodule = async (req,res) => {
  try {
    const courses = await Course.find().lean();

    const fullCourses = await Promise.all(courses.map(async (course) => {
      const modules = await CourseModule.find({ course_id: course._id }).lean();
      return {
        ...course,
        modules,
      };
    }));

    res.json(fullCourses);
  } catch (err) {
    console.error("Error loading course modules:", err); // Add this!
    res.status(500).json({ message: "Server error" });
  }
};
// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("institute_id", "name");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("institute_id", "name");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get lessons for a selected module
exports.getLessonsByModule = async (req, res) => {
  try {
    const lessons = await ModuleLesson.find({ module_id: req.params.moduleId });
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve lessons", error: err.message });
  }
};

exports.getModulesByCourse = async (req, res) => {
  try {
    const modules = await CourseModule.find({ course_id: req.params.courseId });
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve modules", error: err.message });
  }
};






