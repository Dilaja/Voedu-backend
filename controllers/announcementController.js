const Announcement = require("../models/announcement");

// Add Announcement
exports.addAnnouncement = async (req, res) => {
  try {
    const { announcement_type, title, description } = req.body;

    const newAnnouncement = new Announcement({
      announcement_type,
      title,
      description,
    });

    await newAnnouncement.save();

    res.status(201).json({ message: "Announcement created successfully!" });
  } catch (error) {
    console.error("Failed to create announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ announcement_date: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnnouncement) return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json({ message: "Announcement updated successfully", announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
