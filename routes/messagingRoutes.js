const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messagingController");


router.post("/send", sendMessage);
router.get("/:userId", getMessages);
router.delete("/:messageId", deleteMessage);

module.exports = router;
