const paths = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20"/><path d="M16 5.5a3 3 0 0 1 0 5.5M18 20v-1.5a5.3 5.3 0 0 0-2.3-4.4"/></>,
  userCheck: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 9-4.2M16 16l2 2 3.5-4"/></>,
  userX: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 9-4.2M17 15l4 4m0-4-4 4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/><path d="m8 15 2 2 4-4"/></>,
  percent: <><path d="m19 5-14 14"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/></>,
  pencil: <><path d="m4 20 4.3-1 10.4-10.4a2.1 2.1 0 0 0-3-3L5.3 16z"/><path d="m13.7 7.6 3 3"/></>,
  trash: <><path d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-9 0 1 14h10l1-14"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  x: <path d="m6 6 12 12M18 6 6 18"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  chevron: <path d="m7 10 5 5 5-5"/>,
};

export default function Icon({ name, size = 20, strokeWidth = 2, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
