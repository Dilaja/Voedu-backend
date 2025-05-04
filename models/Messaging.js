const mongoose = require("mongoose");

const MessagingSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required"],
    },
    subject: {
      type: String,
      required: [true, "Message subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Messaging = mongoose.model("Messaging", MessagingSchema);
module.exports = Messaging;
