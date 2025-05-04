const express = require("express");
const { register} = require("../controllers/userregisterController");

const router = express.Router();

router.post("/add", register);


module.exports = router;