const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendmail"); 

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
      
          if (!name || !email || !password ) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
          }
      
          
          const hashedPassword = await bcrypt.hash(password, 10);
      
          
          const newUser = new User({
            name,
            email,
            password, 
            status: "Inactive",
            role: "guest",
          });
          await newUser.save();

    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const activationUrl = `http://localhost:3000/Accountactivate/${token}`;

    await sendEmail({
      to: newUser.email,
      subject: "Activate Your Account",
      html: `<p>Hi ${name},</p><p>Click below to activate your account:</p><a href="${activationUrl}">${activationUrl}</a>`,
    });

    res.status(201).json({ message: "Registration successful! Please check your email to activate your account." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};
