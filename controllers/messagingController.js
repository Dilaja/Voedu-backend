const Messaging = require("../models/Messaging");

// Send a new message
exports.sendMessage = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing or empty' });
  }

  
  try {
    const message = new Messaging({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      subject: req.body.subject,
      message: req.body.message,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};



exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Messaging.find({ receiver_id: userId })
      .populate("sender_id", "name email")
      .populate("receiver_id", "name email");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Messaging.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
