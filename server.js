const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const userregisterRoutes = require("./routes/userregisterRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const instituteRoutes = require("./routes/instituteRoutes");
const coursemoduleRoutes = require("./routes/coursemoduleRoutes");
const moduleLessonRoutes = require("./routes/modulelessonsRoutes");
const courseapplicationRoutes= require("./routes/courseapplicationRoutes")
const applyCourseRoutes = require("./routes/applycourseRoutes");
const courseMaterialRoutes = require("./routes/coursematerialRoutes");
const studentAssessmentRoutes = require("./routes/studentassessmentRoutes");
const instructorStudentEvaluationRoutes = require("./routes/instructorstudentevaluationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const studentModuleEvaluationRoutes = require("./routes/studentmoduleevaluationRoutes");
const messagingRoutes = require("./routes/messagingRoutes");
const loginRoutes = require("./routes/authRoutes");
const institutecourseRoutes = require("./routes/institutecourseRoutes");
const { PORT } = require("./config/dotenv");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/register",userregisterRoutes)
app.use("/api/courses", courseRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/Coursemodule", coursemoduleRoutes);
app.use("/api/modulelessons", moduleLessonRoutes);
app.use("/api/courseapplications", courseapplicationRoutes);//Apply courses student data
app.use("/api/applycourse",applyCourseRoutes);//student apply courses
app.use("/uploads", express.static("uploads"));
app.use("/api/coursematerials", courseMaterialRoutes);
app.use("/api/studentassessments", studentAssessmentRoutes);
app.use("/api/evaluations", instructorStudentEvaluationRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/studentevaluations", studentModuleEvaluationRoutes);
app.use("/api/messages", messagingRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/institutecourse", institutecourseRoutes);//institute course list
// Connect to MongoDB
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
