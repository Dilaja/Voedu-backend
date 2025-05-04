const mongoose = require("mongoose");

const ModuleLessonSchema = new mongoose.Schema(
  {
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModule",
      required: true,
    },
    lessontitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ModuleLesson = mongoose.model("Modulelesson", ModuleLessonSchema);
module.exports = ModuleLesson;
