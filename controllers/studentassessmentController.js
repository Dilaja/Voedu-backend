const StudentAssessment = require("../models/studentAssessment");
const CourseModule = require("../models/Coursemodule");

// Add Student Assessment
exports.addAssessment = async (req, res) => {
  try {
    const newAssessment = new StudentAssessment(req.body);
    await newAssessment.save();

    res.status(201).json({ message: "Assessment added successfully", assessment: newAssessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssessmentsByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const assessments = await StudentAssessment.find({ student_id: studentId })
      .populate("course_id", "course_name") // populate course name only
      .populate("module_id", "modulename")  // populate module name only
      .lean();

    res.json(assessments);
  } catch (err) {
    console.error("Error fetching student assessments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Assessments
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await StudentAssessment.find()
      .populate("student_id", "name email") // Populating student details
      .populate("course_id", "course_name") // Populating course details
      .populate("module_id", "modulename"); // Populating module details
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get Single Assessment by ID
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await StudentAssessment.findById(req.params.id)
      .populate("student_id", "name email")
      .populate("course_id", "course_name")
      .populate("module_id", "modulename");
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Update Assessment
exports.updateAssessment = async (req, res) => {
  try {
    const updatedAssessment = await StudentAssessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAssessment) return res.status(404).json({ message: "Assessment not found" });

    res.status(200).json({ message: "Assessment updated successfully", assessment: updatedAssessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Assessment
exports.deleteAssessment = async (req, res) => {
  try {
    const deletedAssessment = await StudentAssessment.findByIdAndDelete(req.params.id);
    if (!deletedAssessment) return res.status(404).json({ message: "Assessment not found" });

    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getstudentAssessment = async (req, res) => {
  try {
    const { studentId, courseId } = req.params; // <-- use params instead of query

    const assessments = await StudentAssessment.find({
      student_id: studentId,
      course_id: courseId
    }).populate('module_id', 'modulename');

    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch assessments", error: error.message });
  }
};
