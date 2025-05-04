const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      trim: true,
    },
    course_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    course_cat: {
      type: String,
      required: true,
    },
    duration_weeks: {
      type: Number,
      required: true,
      min: 1,
    },
    course_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    institute_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    description: {
      type: String,
    },
    prerequisites: {
      type: String,
    },
    learn_outcome: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("Course", CourseSchema);
