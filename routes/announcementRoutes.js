const express = require("express");
const router = express.Router();
const { addAnnouncement, getAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require("../controllers/announcementController");

router.post("/add", addAnnouncement);
router.get("/all", getAnnouncements);
router.get("/:id", getAnnouncementById);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;
