import { useState } from 'react';
import Icon from './Icon';

const blank = { name: '', roll: '', department: '' };
export default function Students({ students, onSave, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const open = (student = null) => { setEditing(student); setForm(student ? { name: student.name, roll: student.roll, department: student.department } : blank); setIsModalOpen(true); };
  const close = () => { setIsModalOpen(false); setEditing(null); setForm(blank); };
  const save = async (event) => { event.preventDefault(); if (await onSave(form, editing)) close(); };
  return <><div className="section-heading"><h1>Manage Students</h1><button className="primary-button" onClick={() => open()}><Icon name="plus" size={20} /> Add Student</button></div>
    <section className="data-card students-table"><table><thead><tr><th>Name</th><th>Roll Number</th><th>Department</th><th>Actions</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td className="student-name">{student.name}</td><td>{student.roll}</td><td><span className="department-pill">{student.department}</span></td><td className="row-actions"><button onClick={() => open(student)} aria-label={`Edit ${student.name}`}><Icon name="pencil" size={20} /></button><button className="danger" onClick={() => onDelete(student.id)} aria-label={`Delete ${student.name}`}><Icon name="trash" size={19} /></button></td></tr>)}</tbody></table></section>
    {isModalOpen && <div className="modal-overlay" onMouseDown={close}><section className="student-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}><header><h2>{editing ? 'Edit Student' : 'Add New Student'}</h2><button onClick={close} aria-label="Close"><Icon name="x" size={25} /></button></header><form onSubmit={save}><label>Student Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" /></label><label>Roll Number<input required disabled={Boolean(editing)} value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} placeholder="e.g. CS101" /></label><label>Department<input required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Computer Science" /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={close}>Cancel</button><button className="primary-button" type="submit">{editing ? 'Update' : 'Save'}</button></div></form></section></div>}
  </>;
}
