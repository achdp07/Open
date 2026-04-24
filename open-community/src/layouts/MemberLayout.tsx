import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  CreditCard,
  UserCircle,
  LogOut,
  
} from 'lucide-react';

const navLinks = [
  { to: '/dashboard/member', label: 'Dashboard', icon: <LayoutDashboard size={16} />, end: true },
  { to: '/dashboard/member/programs', label: 'Mes Programmes', icon: <BookOpen size={16} /> },
  { to: '/dashboard/member/community', label: 'Communauté', icon: <Users size={16} /> },
  { to: '/dashboard/member/events', label: 'Événements', icon: <Calendar size={16} /> },
  { to: '/dashboard/member/subscription', label: 'Abonnement', icon: <CreditCard size={16} /> },
];

const bottomLinks = [
  { to: '/dashboard/member/profile', label: 'Mon Profil', icon: <UserCircle size={16} /> },
];

export default function MemberLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-teal-dark flex flex-col py-6 px-3 fixed h-full z-40">

        {/* Logo */}
        <div className="px-3 mb-8">
          <span className="text-xl font-black text-white">
            <img src={logo} alt="Logo" className='h-10' />
          </span>
        </div>

        {/* Main nav */}
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

        {/* Bottom nav */}
        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all w-full text-left">
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}