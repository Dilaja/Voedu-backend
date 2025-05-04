const mongoose = require("mongoose");

const CourseApplicationSchema = new mongoose.Schema(
  
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
      reference_no: {
        type: String,
        unique: true,
        required: true,
      },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    nicno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneno: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    application_status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    application_date: {
      type: Date,
      default: Date.now,
    },
    approval_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const CourseApplication = mongoose.model("CourseApplication", CourseApplicationSchema);
module.exports = CourseApplication;
