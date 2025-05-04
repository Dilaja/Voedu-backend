const InstituteCourseMap = require("../models/institutecourse");
const Institute = require("../models/Institute");
const Course = require("../models/Courses");

// Add new mapping
exports.createMapping = async (req, res) => {
  try {
    const { institute_id, course_cat, course_code } = req.body;

    
    if (!institute_id || !course_cat || !course_code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const course = await Course.findOne({ course_code });
    if (!course) {
      return res.status(404).json({ message: "Course not found with this code" });
    }

    
    const institute = await Institute.findById(institute_id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    
    const exists = await InstituteCourseMap.findOne({ institute_id, course_code });
    if (exists) {
      return res.status(409).json({ message: "Mapping already exists" });
    }

    const newMapping = new InstituteCourseMap({ institute_id, course_cat, course_code });
    await newMapping.save();

    res.status(201).json({ message: "Mapping created successfully", data: newMapping });
  } catch (error) {
    console.error("Error creating mapping:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all mappings
exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await InstituteCourseMap.find().populate("institute_id");
    res.status(200).json(mappings);
  } catch (error) {
    console.error("Error fetching mappings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get mappings by institute ID
exports.getMappingsByInstitute = async (req, res) => {
  try {
    const { instituteId } = req.params;
    const mappings = await InstituteCourseMap.find({ institute_id: instituteId }).populate("institute_id");

    if (!mappings.length) {
      return res.status(404).json({ message: "No mappings found for this institute" });
    }

    res.status(200).json(mappings);
  } catch (error) {
    console.error("Error fetching institute mappings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a mapping
exports.deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await InstituteCourseMap.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    res.status(200).json({ message: "Mapping deleted successfully" });
  } catch (error) {
    console.error("Error deleting mapping:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCoursesByInstituteAndCategory = async (req, res) => {
    try {
      const { instituteId, category } = req.params;
  
      if (!instituteId || !category) {
        return res.status(400).json({ message: "Institute ID and category are required." });
      }
  
      
      const mappings = await InstituteCourseMap.find({
        institute_id: instituteId,
        course_cat: category,
      });
  
      if (!mappings.length) {
        return res.status(404).json({ message: "No course mappings found for the given institute and category." });
      }
  
      
      const courseCodes = mappings.map((m) => m.course_code);
  
      
      const courses = await Course.find({ course_code: { $in: courseCodes } });
  
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses by institute and category:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
exports.getProgramsByInstitute = async (req, res) => {
  const { instituteId } = req.params;

  try {
    const mappings = await InstituteCourseMap.find({ institute_id: instituteId });
    const courseCats = [...new Set(mappings.map(m => m.course_cat))];

    res.status(200).json(courseCats);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Failed to fetch programs" });
  }
};


exports.getCoursesByInstituteAndProgram = async (req, res) => {
  const { instituteId, courseCat } = req.params;

  try {
    const mappings = await InstituteCourseMap.find({
      institute_id: instituteId,
      course_cat: courseCat,
    });

    const courseCodes = mappings.map(m => m.course_code);
    res.status(200).json(courseCodes);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
