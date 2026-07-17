const Student = require('../models/Student');
const Attendence = require('../models/Attendence');

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    try {
        const { name, rollno, department } = req.body;

        const newStudent = new Student({
            name,
            rollno,
            department
        });

        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error });
    }
};

// Update student by ID
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rollno, department } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, rollno, department },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating student', error });
    }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Attendence.deleteMany({ studentId: id });

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};
