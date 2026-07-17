import Icon from './Icon';

const items = [
  ['dashboard', 'Dashboard', 'dashboard'], ['students', 'Students', 'users'], ['attendance', 'Attendance', 'calendar'],
];

export default function Navigation({ page, setPage }) {
  return <header className="topbar"><div className="nav-inner">
    <button className="brand" onClick={() => setPage('dashboard')}><span className="brand-mark">A</span><span>Attendance<span>Tracker</span></span></button>
    <nav>{items.map(([id, label, icon]) => <button key={id} onClick={() => setPage(id)} className={page === id ? 'active' : ''}><Icon name={icon} size={20} strokeWidth={2.1} />{label}</button>)}</nav>
  </div></header>;
}
