import { useState } from 'react';
import Icon from './Icon';

const formatted = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const todayLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now - offset).toISOString().slice(0, 10);
};
export default function Attendance({ students, records, onSave, onStatusChange, onDelete }) {
  const [form, setForm] = useState({ studentId: students[0]?.id || '', date: todayLocal(), status: 'Present' });
  const studentFor = (id) => students.find((student) => student.id === id);
  const mark = async (event) => { event.preventDefault(); if (!form.studentId) return; const found = records.find((item) => item.studentId === form.studentId && item.date === form.date); await onSave(form, found); };
  return <><h1>Attendance Records</h1><div className="attendance-grid"><section className="mark-card"><h2>Mark New Attendance</h2><form onSubmit={mark}><label>Select Student<select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>{students.map((student) => <option key={student.id} value={student.id}>{student.name} ({student.roll})</option>)}</select></label><label>Date<span className="date-field"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><Icon name="calendar" size={18} /></span></label><fieldset><legend>Status</legend><label className="radio-label"><input type="radio" checked={form.status === 'Present'} onChange={() => setForm({ ...form, status: 'Present' })} />Present</label><label className="radio-label"><input type="radio" checked={form.status === 'Absent'} onChange={() => setForm({ ...form, status: 'Absent' })} />Absent</label></fieldset><button className="primary-button wide"><Icon name="plus" size={20} /> Mark Attendance</button></form></section>
    <section className="data-card attendance-table"><table><thead><tr><th>Student</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{records.map((record) => { const student = studentFor(record.studentId); if (!student) return null; const present = record.status === 'Present'; return <tr key={record.id}><td><strong>{student.name}</strong><small>{student.roll}</small></td><td>{formatted(record.date)}</td><td><span className={`status-pill ${present ? 'present' : 'absent'}`}><Icon name={present ? 'check' : 'x'} size={14} />{record.status}</span></td><td className="attendance-actions"><select className="status-select" value={record.status} aria-label={`Change ${student.name}'s attendance`} onChange={(event) => onStatusChange(record, event.target.value)}><option value="Present">Present</option><option value="Absent">Absent</option></select><button className="danger" onClick={() => onDelete(record.id)} aria-label={`Delete ${student.name}'s attendance`}><Icon name="trash" size={18} /></button></td></tr>; })}</tbody></table></section></div></>;
}
