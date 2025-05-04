const mongoose = require("mongoose");

const ApplyCourseSchema = new mongoose.Schema(
  {
    application_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseApplication",
      required: true,
    },
    institute_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",  
      required: true,
    },
    course_cat: {
      type: String,
      required: true,
      trim: true,
    },
    course_code: {
      type: String,
      required: true,
      trim: true,
    },
    is_enrolled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ApplyCourse = mongoose.model("ApplyCourse", ApplyCourseSchema);
module.exports = ApplyCourse;
