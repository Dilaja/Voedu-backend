const express = require("express");
const router = express.Router();
const { addInstitute, getInstitutes, getInstituteById, updateInstitute, deleteInstitute } = require("../controllers/instituteController");

// Create Institute
router.post("/add", addInstitute);
router.get("/all", getInstitutes);
router.get("/:id", getInstituteById);
router.put("/:id", updateInstitute);
router.delete("/:id", deleteInstitute);

module.exports = router;
