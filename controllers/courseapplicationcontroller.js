const CourseApplication = require("../models/courseApplication");
const mongoose = require("mongoose");
const ApplyCourse = require("../models/ApplyCourse");

// Add New Course Application
exports.addApplication = async (req, res) => {
  try {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    
    const startOfMonth = new Date(year, now.getMonth(), 1);
    const endOfMonth = new Date(year, now.getMonth() + 1, 0);

    const count = await CourseApplication.countDocuments({
      application_date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const paddedNumber = String(count + 1).padStart(5, "0");
    const referenceNo = `${month}-${year}/${paddedNumber}`;

    const newApplication = new CourseApplication({
      ...req.body,
      reference_no: referenceNo,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error in addApplication:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllApplicationsCourses = async (req, res) => {
  try {
    const applications = await CourseApplication.find();
    const applyCourses = await ApplyCourse.find()
      .populate("application_id")
      .populate("institute_id");

    res.json({ applications, applyCourses });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Course Applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await CourseApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Course Application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await CourseApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await CourseApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplication) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application updated successfully", application: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await CourseApplication.findByIdAndDelete(req.params.id);
    if (!deletedApplication) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.enrollStudentInCourse = async (req, res) => {
  const { applicationId, applyCourseId } = req.body;

  if (!applicationId || !applyCourseId) {
    return res.status(400).json({ error: "Missing applicationId or applyCourseId" });
  }

  try {
    
    await CourseApplication.findByIdAndUpdate(applicationId, {
      application_status: "Approved",
    });

    
    await ApplyCourse.findByIdAndUpdate(applyCourseId, {
      is_enrolled: true,
    });

     

    await ApplyCourse.updateMany(
      { application_id: applicationId, _id: { $ne: applyCourseId } },
      { is_enrolled: false }
    );

    res.json({ message: "Student enrolled in selected course." });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Enrollment failed" });
  }
};


  
exports.profile = async (req, res) => {
  try {
    const personalInfo = await CourseApplication.findOne({ user_id: req.params.id });

    if (!personalInfo) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    const enrolledCourses = await ApplyCourse.find({
      application_id: personalInfo._id,
      is_enrolled: true,
    })
      .populate('institute_id')
      .populate('course_id');  

    res.json({
      personalInfo,
      enrolledCourses,
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

 


