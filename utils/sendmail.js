const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use your SMTP service
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail or SMTP email
        pass: process.env.EMAIL_PASS, // App password (not your main password!)
      },
    });

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;
