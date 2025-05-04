const mongoose = require("mongoose");

const StudentModuleEvaluationSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course_Module",
      required: true,
    },
    instructor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    effectiveness: {
      type: String,
      required: true,
      
    },
    course_content: {
      type: String,
      required: true,
      
    },
    resources: {
      type: String,
      required: true,
      
    },
    comments: {
      type: String,
      trim: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const StudentModuleEvaluation = mongoose.model("StudentModuleEvaluation", StudentModuleEvaluationSchema);
module.exports = StudentModuleEvaluation;
