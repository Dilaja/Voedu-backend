const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactno: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid contact number"],
    },
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", InstituteSchema);
module.exports = Institute;
