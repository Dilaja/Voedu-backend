const InstructorStudentEvaluation = require("../models/instructorstudentEvaluation");
const User = require("../models/User");
const CourseModule = require("../models/Coursemodule");

// Add Evaluation
exports.addEvaluation = async (req, res) => {
  try {
    const newEvaluation = new InstructorStudentEvaluation(req.body);
    await newEvaluation.save();

    res.status(201).json({ message: "Evaluation added successfully", evaluation: newEvaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get All Evaluations
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await InstructorStudentEvaluation.find()
      .populate("instructor_id", "name email")
      .populate("student_id", "name email");
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Evaluation by ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await InstructorStudentEvaluation.findById(req.params.id)
      .populate("instructor_id", "name email")
      .populate("student_id", "name email");

    if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Evaluation
exports.updateEvaluation = async (req, res) => {
  try {
    const updatedEvaluation = await InstructorStudentEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json({ message: "Evaluation updated successfully", evaluation: updatedEvaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Evaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const deletedEvaluation = await InstructorStudentEvaluation.findByIdAndDelete(req.params.id);
    if (!deletedEvaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json({ message: "Evaluation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await InstructorStudentEvaluation.find()
      .populate({
        path: 'student_id',
        match: { role: 'student' }, 
        select: 'name role',
      })
      .populate({
        path: 'module_id',

        select: 'modulename',
      });

    
    const filteredEvaluations = evaluations.filter(e => e.student_id);

    res.json(filteredEvaluations);
  } catch (err) {
    console.error('Error fetching evaluations:', err);
    res.status(500).json({ error: 'Failed to fetch evaluations' });
  }
};