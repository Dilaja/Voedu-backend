const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Add a new user
exports.addUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({ name, email, password:hashedPassword, role });
await newUser.save();
  
      res.status(201).json({ message: "User created successfully", user: newUser });
  
    } catch (error) {
      res.status(500).json({ message: "Error adding user", error: error.message });
    }
  };

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users }); 
    } catch (error) {
      res.status(500).json({ message: "Failed to get users", error });
    }
  };

// Get user by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

exports.activateUser = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: "Activation token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "Active") {
      return res.status(200).json({ message: "Account already activated" });
    }

    user.status = "Active";
    await user.save();

    return res.status(200).json({ message: "Account activated successfully" });

  } catch (error) {
    console.error("Activation error:", error);
    return res.status(400).json({ message: "Activation failed", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Old password is incorrect" });

    user.password = newPassword;  // this will trigger userSchema.pre("save")
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password", error: err.message });
  }
};

exports.getStudentusers = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInstructorusers = async (req, res) => {
  try {
    const instructor = await User.find({ role: "instructor" });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getrecipients = async (req, res) => {
  try {
    const recipients = await User.find({ role: { $in: ["instructor", "admin"] } }, "name email role");
    res.json(recipients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};