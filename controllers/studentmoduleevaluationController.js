const StudentModuleEvaluation = require("../models/studentmoduleEvaluation");

// Add Evaluation
exports.addEvaluation = async (req, res) => {
  try {
    const newEvaluation = new StudentModuleEvaluation(req.body);
    await newEvaluation.save();

    res.status(201).json({ message: "Evaluation submitted successfully", evaluation: newEvaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Evaluations
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await StudentModuleEvaluation.find()
      .populate("student_id", "name email")
      .populate("course_id", "course_name")
      .populate("module_id", "modulename")
      .populate("instructor_id", "name");
      
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Evaluation by ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await StudentModuleEvaluation.findById(req.params.id)
      .populate("student_id", "name email")
      .populate("course_id", "course_name")
      .populate("module_id", "modulename")
      .populate("instructor_id", "name");

    if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Evaluation
exports.updateEvaluation = async (req, res) => {
  try {
    const updatedEvaluation = await StudentModuleEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedEvaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json({ message: "Evaluation updated successfully", evaluation: updatedEvaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Evaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const deletedEvaluation = await StudentModuleEvaluation.findByIdAndDelete(req.params.id);

    if (!deletedEvaluation) return res.status(404).json({ message: "Evaluation not found" });

    res.status(200).json({ message: "Evaluation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
