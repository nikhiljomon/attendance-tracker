const express = require("express");

const {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} = require("../controllers/studentController");

const studentrouter = express.Router();

studentrouter.get("/", getStudents);

studentrouter.post("/", createStudent);

studentrouter.put("/:id", updateStudent);

studentrouter.delete("/:id", deleteStudent);

module.exports = studentrouter;
