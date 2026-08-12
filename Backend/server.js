const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentrouter = require("./routes/studentRoutes");
const attendancerouter = require("./routes/attendenceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/attendancetracker";

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/students", studentrouter);
app.use("/api/attendence", attendancerouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running on Port 5000");
});
