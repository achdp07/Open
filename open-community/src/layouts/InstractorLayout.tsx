import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  GraduationCap,
} from 'lucide-react';

const navLinks = [
  { to: '/dashboard/instructor', label: 'Dashboard', icon: <LayoutDashboard size={16} />, end: true },
  { to: '/dashboard/instructor/programs', label: 'Mes Programmes', icon: <BookOpen size={16} /> },
  { to: '/dashboard/instructor/learners', label: 'Mes Apprenants', icon: <Users size={16} /> },
];

export default function InstructorLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-teal-dark flex flex-col py-6 px-3 fixed h-full z-40">

        {/* Logo */}
        <div className="px-3 mb-2">
          <span className="text-xl font-black text-white">
            Open<span className="text-lime-bright">!</span>
          </span>
        </div>

        {/* Instructor badge */}
        <div className="px-3 mb-8">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <GraduationCap size={14} className="text-lime-bright" />
            <span className="text-xs font-bold text-white/80">Instructeur</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all w-full text-left">
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}