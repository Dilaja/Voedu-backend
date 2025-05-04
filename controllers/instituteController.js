const Institute = require("../models/Institute");

// Add New Institute
exports.addInstitute = async (req, res) => {
  try {
    const { name, address, contactno } = req.body;

    const newInstitute = new Institute({ name, address, contactno });
    await newInstitute.save();

    res.status(201).json({ message: "Institute added successfully", institute: newInstitute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Institutes
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Institute by ID
exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) return res.status(404).json({ message: "Institute not found" });

    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Institute
exports.updateInstitute = async (req, res) => {
  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInstitute) return res.status(404).json({ message: "Institute not found" });

    res.status(200).json({ message: "Institute updated successfully", institute: updatedInstitute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete Institute
exports.deleteInstitute = async (req, res) => {
  try {
    const deletedInstitute = await Institute.findByIdAndDelete(req.params.id);
    if (!deletedInstitute) return res.status(404).json({ message: "Institute not found" });

    res.status(200).json({ message: "Institute deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
