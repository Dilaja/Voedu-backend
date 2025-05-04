const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    announcement_type: {
      type: String,
      required: true,
      enum: ["General", "Course", "Event", "Other"], 
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    announcement_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
module.exports = Announcement;