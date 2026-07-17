import { useState } from 'react';
import Icon from './Icon';

const todayLocal = () => {
  const now = new Date();
  return new Date(now - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

export default function Dashboard({ students, records }) {
  const [selectedDate, setSelectedDate] = useState(todayLocal());
  const selectedRecords = records.filter((item) => item.date === selectedDate);
  const present = selectedRecords.filter((item) => item.status === 'Present').length;
  const absent = selectedRecords.filter((item) => item.status === 'Absent').length;
  const rate = selectedRecords.length ? Math.round((present / selectedRecords.length) * 100) : 0;
  const cards = [
    ['Total Students', students.length, 'users', 'blue'], ['Present', present, 'userCheck', 'green'],
    ['Absent', absent, 'userX', 'red'], ['Attendance Percentage', `${rate}%`, 'percent', 'purple'],
  ];
  return <><div className="dashboard-heading"><h1>Dashboard Overview</h1><label>Filter by date<input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /></label></div><section className="stats-grid">{cards.map(([title, value, icon, color]) => <article className={`stat-card ${color}`} key={title}><div><p>{title}</p><strong>{value}</strong></div><span className="stat-icon"><Icon name={icon} size={29} /></span></article>)}</section>
    <section className="welcome-card"><span className="welcome-icon"><Icon name="users" size={39} /></span><h2>Welcome to Attendance Tracker</h2><p>Manage your students and track their daily attendance easily. Use the<br className="desktop-only" /> navigation menu to access the Students and Attendance modules.</p></section>
  </>;
}
