const mongoose = require("mongoose");

const CourseModuleSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    modulename: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const CourseModule = mongoose.model("Coursemodule", CourseModuleSchema);
module.exports = CourseModule;
