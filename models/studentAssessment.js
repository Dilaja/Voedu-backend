const mongoose = require("mongoose");

const StudentAssessmentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coursemodule",
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Adjust max marks as per your grading system
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const StudentAssessment = mongoose.model("StudentAssessment", StudentAssessmentSchema);
module.exports = StudentAssessment;
