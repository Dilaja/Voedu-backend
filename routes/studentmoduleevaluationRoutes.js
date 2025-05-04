const express = require("express");
const router = express.Router();
const {
  addEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
} = require("../controllers/studentmoduleevaluationController");


router.post("/add", addEvaluation);
router.get("/all", getEvaluations);
router.get("/:id", getEvaluationById);
router.put("/:id", updateEvaluation);
router.delete("/:id", deleteEvaluation);

module.exports = router;
