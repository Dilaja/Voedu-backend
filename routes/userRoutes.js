const express = require("express");

const { protect } = require('../Middleware/authmiddleware');
const { addUser, getAllUsers, getUser, updateUser, deleteUser ,activateUser,changePassword ,getStudentusers,getInstructorusers ,getrecipients} = require("../controllers/userController");

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getAllUsers);
router.get("/students", getStudentusers);
router.get("/instructor", getInstructorusers);
router.get("/recipients", getrecipients);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/activate/:token", activateUser);
router.post('/changepassword', protect, changePassword);

module.exports = router;
