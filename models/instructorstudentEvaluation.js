const mongoose = require("mongoose");

const InstructorStudentEvaluationSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coursemodule",
      required: true,
    },
    Participation: {
      type: String,
      required: true,
      trim: true,
    },
    AssignmentQuality: {
      type: String,
      required: true,
      trim: true,
    },
    Understanding: {
      type: String,
      required: true,
      trim: true,
    },
    Attendance: {
      type: String,
      required: true,
      trim: true,
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const InstructorStudentEvaluation = mongoose.model(
  "InstructorStudentEvaluation",
  InstructorStudentEvaluationSchema
);

module.exports = InstructorStudentEvaluation;

