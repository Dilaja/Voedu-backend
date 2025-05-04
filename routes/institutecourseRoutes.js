const express = require("express");
const router = express.Router();
const { createMapping, getAllMappings, getMappingsByInstitute, deleteMapping ,getCoursesByInstituteAndCategory,getProgramsByInstitute,
    getCoursesByInstituteAndProgram}  = require("../controllers/institutecourseController");


router.post("/add", createMapping);
router.get("/all", getAllMappings);
router.get("/institute/:instituteId", getMappingsByInstitute);
router.delete("/:id", deleteMapping);
router.get("/courses/:instituteId/:category", getCoursesByInstituteAndCategory);
router.get("/programs/:instituteId", getProgramsByInstitute);
router.get("/courses/:instituteId/:courseCat", getCoursesByInstituteAndProgram);
module.exports = router;



