const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "secret_key", 
    { expiresIn: "1d" }
  );
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User from DB:", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.status !== "Active") {
      return res.status(403).json({ message: "Please activate your account" });
    }

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

