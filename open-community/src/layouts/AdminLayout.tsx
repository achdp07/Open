import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo3.png';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';



const navLinks = [
  { to: '/dashboard/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} />, end: true },
  { to: '/dashboard/admin/users', label: 'Utilisateurs', icon: <Users size={16} /> },
  { to: '/dashboard/admin/programs', label: 'Programmes', icon: <BookOpen size={16} /> },
  { to: '/dashboard/admin/settings', label: 'Paramètres', icon: <Settings size={16} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user session (e.g., remove tokens from localStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to the login page
    navigate('/join', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-navy-deep flex flex-col py-6 px-3 fixed h-full z-40">

        {/* Logo */}
        <div className="px-3 mb-2">
            <img src={logo} alt="Open!" className="w-32" />
        </div>

        {/* Admin badge */}
        <div className="px-3 mb-8">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <Shield size={14} className="text-lime-bright" />
            <span className="text-xs font-bold text-white/80">Super Admin</span>
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
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl
           text-sm font-semibold text-white/60 hover:text-white 
           hover:bg-white/10 transition-all w-full text-left" 
           onClick={handleLogout}>
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