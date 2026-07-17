const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || 'Could not complete the request.');
  return body;
}

export const api = {
  getStudents: () => request('/students'),
  createStudent: (student) => request('/students', { method: 'POST', body: JSON.stringify(student) }),
  updateStudent: (id, student) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(student) }),
  deleteStudent: (id) => request(`/students/${id}`, { method: 'DELETE' }),
  getAttendance: () => request('/attendence'),
  createAttendance: (record) => request('/attendence', { method: 'POST', body: JSON.stringify(record) }),
  updateAttendance: (id, record) => request(`/attendence/${id}`, { method: 'PUT', body: JSON.stringify(record) }),
  deleteAttendance: (id) => request(`/attendence/${id}`, { method: 'DELETE' }),
};
