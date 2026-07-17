const express = require("express");
const {
  getAttendences,
  createAttendence,
  updateAttendence,
  deleteAttendence
} = require("../controllers/attendenceController");

const attendancerouter = express.Router();

attendancerouter.get("/", getAttendences);
attendancerouter.post("/", createAttendence);
attendancerouter.put("/:id", updateAttendence);
attendancerouter.delete("/:id", deleteAttendence);

module.exports = attendancerouter;
