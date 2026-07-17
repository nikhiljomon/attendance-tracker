const Attendence = require('../models/Attendence');

// Get all attendances
const getAttendences = async (req, res) => {
    try {
        const attendences = await Attendence.find().populate('studentId', 'name rollno department');
        res.json(attendences);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendances', error });
    }
};

// Create a new attendance record
const createAttendence = async (req, res) => {
    try {
        const { studentId, attendenceDate, status } = req.body;

        const newAttendence = new Attendence({
            studentId,
            attendenceDate,
            status
        });

        await newAttendence.save();
        res.status(201).json(newAttendence);
    } catch (error) {
        res.status(400).json({ message: 'Error creating attendance', error });
    }
};

// Update attendance by ID
const updateAttendence = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, attendenceDate, status } = req.body;

        const updatedAttendence = await Attendence.findByIdAndUpdate(
            id,
            { studentId, attendenceDate, status },
            { new: true }
        );

        if (!updatedAttendence) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json(updatedAttendence);
    } catch (error) {
        res.status(400).json({ message: 'Error updating attendance', error });
    }
};

// Delete attendance by ID
const deleteAttendence = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAttendence = await Attendence.findByIdAndDelete(id);

        if (!deletedAttendence) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance', error });
    }
};

module.exports = {
    getAttendences,
    createAttendence,
    updateAttendence,
    deleteAttendence,
};
