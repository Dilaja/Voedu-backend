const mongoose = require("mongoose");

const CourseMaterialSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    module_title: {  // <-- NEW FIELD
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    fileurl: {
      type: String,
      required: true,
    },
    upload_at: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true }
);

const CourseMaterial = mongoose.model("CourseMaterial", CourseMaterialSchema);
module.exports = CourseMaterial;
