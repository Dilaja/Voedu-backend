const CourseMaterial = require("../models/courseMaterial");
const CourseApplication = require("../models/courseApplication");
const ApplyCourse = require("../models/ApplyCourse");
const mongoose = require('mongoose');
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
exports.upload = upload; //


exports.addCourseMaterial = async (req, res) => {
  try {
    const { title, type, course_id, module_title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newMaterial = new CourseMaterial({
      title,
      type,
      course_id,
      module_title, 
      filename: req.file.filename,
      fileurl: `/uploads/${req.file.filename}`,
    });

    await newMaterial.save();

    res.status(201).json({
      message: "Material uploaded successfully",
      material: newMaterial,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload material", error: err.message });
  }
};

exports.getstudentcourseMaterials = async (req, res) => {
  try {
    const userId = req.params.userId;  

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const applications = await CourseApplication.find({ user_id: new mongoose.Types.ObjectId(userId) });


    const enrolledCourses = await Promise.all(
      applications.map(async (app) => {
        const course = await ApplyCourse.findOne({ application_id: app._id }).populate("course_id");
        return course;
      })
    );

    const courseIds = enrolledCourses
      .filter((c) => c && c.course_id)
      .map((c) => c.course_id._id);

    const materials = await CourseMaterial.find({ course_id: { $in: courseIds } });

    const grouped = courseIds.map((courseId) => ({
      course_id: courseId,
      materials: materials.filter((m) => m.course_id.equals(courseId)),
    }));

    res.json({
      applications,
      enrolledCourses,
      materials: grouped,
    });
  } catch (err) {
    console.error("Error fetching student materials:", err);
    res.status(500).json({ message: "Failed to fetch student course materials", error: err.message });
  }
};



// Get All Course Materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await CourseMaterial.find().populate("course_id");
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Course Material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await CourseMaterial.findById(req.params.id).populate("course_id");
    if (!material) return res.status(404).json({ message: "Material not found" });

    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Course Material
exports.updateMaterial = async (req, res) => {
  try {
    const updatedMaterial = await CourseMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMaterial) return res.status(404).json({ message: "Material not found" });

    res.status(200).json({ message: "Material updated successfully", material: updatedMaterial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Course Material
exports.deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await CourseMaterial.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) return res.status(404).json({ message: "Material not found" });

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
