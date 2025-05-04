//const ApplyCourse = require("../models/applyCourse");
const ApplyCourse = require("../models/ApplyCourse");

exports.addApplyCourse = async (req, res) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      
      result = await ApplyCourse.insertMany(req.body);
    } else {
     
      const newApplyCourse = new ApplyCourse(req.body);
      result = await newApplyCourse.save();
    }

    res.status(201).json({ message: "Course application(s) submitted successfully", result });
  } catch (error) {
    console.log("Received apply course data:", req.body);
    console.error("ApplyCourse Error:", error); // Add this!
    res.status(500).json({ error: error.message });
  }
};


//Get All Apply Course Entries
exports.getApplyCourses = async (req, res) => {
  try {
    const applyCourses = await ApplyCourse.find().populate("application_id").populate("institute_id");
    res.status(200).json(applyCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Apply Course by ID
exports.getApplyCourseById = async (req, res) => {
  try {
    const courses = await ApplyCourse.find({ application_id: req.params.id })
      .populate("institute_id");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Update Apply Course Entry
exports.updateApplyCourse = async (req, res) => {
  try {
    const updatedApplyCourse = await ApplyCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplyCourse) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application updated successfully", applyCourse: updatedApplyCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Apply Course Entry
exports.deleteApplyCourse = async (req, res) => {
  try {
    const deletedApplyCourse = await ApplyCourse.findByIdAndDelete(req.params.id);
    if (!deletedApplyCourse) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
