import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Students from './Students';
import Attendance from './Attendance';
import { api } from './api';
import './App.css';

const toStudent = (student) => ({ id: student._id, name: student.name, roll: student.rollno, department: student.department });
const toRecord = (record) => ({
  id: record._id,
  studentId: typeof record.studentId === 'object' ? record.studentId?._id : record.studentId,
  date: new Date(record.attendenceDate).toISOString().slice(0, 10),
  status: record.status,
});

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getStudents(), api.getAttendance()])
      .then(([studentData, attendanceData]) => { setStudents(studentData.map(toStudent)); setRecords(attendanceData.map(toRecord)); })
      .catch((err) => setError(`${err.message} Start MongoDB and the backend server on port 5000.`))
      .finally(() => setIsLoading(false));
  }, []);

  const run = async (action) => {
    try { setError(''); return await action(); }
    catch (err) { setError(err.message); return null; }
  };
  const saveStudent = (form, editing) => run(async () => {
    const payload = { name: form.name, rollno: form.roll, department: form.department };
    const saved = editing ? await api.updateStudent(editing.id, payload) : await api.createStudent(payload);
    const student = toStudent(saved);
    setStudents((all) => editing ? all.map((item) => item.id === student.id ? student : item) : [...all, student]);
    return true;
  });
  const removeStudent = (id) => run(async () => {
    await api.deleteStudent(id);
    setStudents((all) => all.filter((item) => item.id !== id));
    setRecords((all) => all.filter((item) => item.studentId !== id));
  });
  const saveAttendance = (form, existing) => run(async () => {
    const payload = { studentId: form.studentId, attendenceDate: form.date, status: form.status };
    const saved = existing ? await api.updateAttendance(existing.id, payload) : await api.createAttendance(payload);
    const record = toRecord(saved);
    setRecords((all) => existing ? all.map((item) => item.id === record.id ? record : item) : [record, ...all]);
    return true;
  });
  const changeAttendanceStatus = (record, status) => saveAttendance({ ...record, status }, record);
  const removeAttendance = (id) => run(async () => { await api.deleteAttendance(id); setRecords((all) => all.filter((item) => item.id !== id)); });
  const content = page === 'dashboard'
    ? <Dashboard students={students} records={records} />
    : page === 'students'
      ? <Students students={students} onSave={saveStudent} onDelete={removeStudent} />
      : <Attendance students={students} records={records} onSave={saveAttendance} onStatusChange={changeAttendanceStatus} onDelete={removeAttendance} />;

  return <div className="app-shell"><Navigation page={page} setPage={setPage} />
    <main className="page-content">{error && <p className="app-error">{error}</p>}{isLoading ? <p className="loading">Loading data…</p> : content}</main>
    <footer>© 2026 Attendance Tracker. All rights reserved.</footer>
  </div>;
}
