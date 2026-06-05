import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  CreditCard,
  User,
  LogOut,
  PanelLeft,
} from 'lucide-react';
import logo from '../assets/images/logo1.png';

const navLinks = [
  {
    to: '/dashboard/member',
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
    end: true,
  },
  {
    to: '/dashboard/member/programs',
    label: 'Programmes',
    icon: <BookOpen size={18} />,
  },
  {
    to: '/dashboard/member/community',
    label: 'Communauté',
    icon: <Users size={18} />,
  },
  {
    to: '/dashboard/member/events',
    label: 'Événements',
    icon: <Calendar size={18} />,
  },
  {
    to: '/dashboard/member/subscription',
    label: 'Abonnement',
    icon: <CreditCard size={18} />,
  },
];

export default function MemberLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem('sidebarCollapsed') === 'true'
  );

  useEffect(() => {
    localStorage.setItem(
      'sidebarCollapsed',
      String(collapsed)
    );
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/join', {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex
          fixed
          left-0
          top-0
          h-screen
          bg-white
          border-r
          border-slate-200
          flex-col
          transition-all
          duration-300
          z-40
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-slate-900">
              <img src={logo} alt="Open!" className="w-18" />
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white transition"
          >
            <PanelLeft size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `
                flex items-center
                gap-3
                px-3
                py-2.5
                rounded-xl
                text-sm
                font-medium
                transition-all

                ${
                  isActive
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }
              `
              }
            >
              {link.icon}

              {!collapsed && (
                <span>{link.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-200 p-3">
          <NavLink
            to="/dashboard/member/profile"
            className={({ isActive }) =>
              `
              flex items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              font-medium
              transition-all
              mb-1

              ${
                isActive
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                  : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }
            `
            }
          >
            <User size={18} />

            {!collapsed && (
              <span>Profil</span>
            )}
          </NavLink>

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              font-medium
              text-slate-500
              hover:bg-white
              hover:text-red-500
              transition-all
            "
          >
            <LogOut size={18} />

            {!collapsed && (
              <span>Déconnexion</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        className={`
          transition-all
          duration-300
          min-h-screen
          ${
            collapsed
              ? 'lg:ml-20'
              : 'lg:ml-64'
          }
        `}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur flex items-center justify-between px-2 lg:px-6">
          <h2 className="font-semibold text-slate-900">
            Open Learning
          </h2>

          <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
            A
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div
        className="
          lg:hidden
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          border-slate-200
          h-16
          flex
          items-center
          justify-around
          z-50
        "
      >
        <NavLink
          to="/dashboard/member"
          end
          className={({ isActive }) =>
            isActive
              ? 'text-green-500'
              : 'text-slate-400'
          }
        >
          <LayoutDashboard size={22} />
        </NavLink>

        <NavLink
          to="/dashboard/member/programs"
          className={({ isActive }) =>
            isActive
              ? 'teal-green-500'
              : 'text-slate-400'
          }
        >
          <BookOpen size={22} />
        </NavLink>

        <NavLink
          to="/dashboard/member/community"
          className={({ isActive }) =>
            isActive
              ? 'text-green-500'
              : 'text-slate-400'
          }
        >
          <Users size={22} />
        </NavLink>

        <NavLink
          to="/dashboard/member/events"
          className={({ isActive }) =>
            isActive
              ? 'text-green-500'
              : 'text-slate-400'
          }
        >
          <Calendar size={22} />
        </NavLink>

        <NavLink
          to="/dashboard/member/profile"
          className={({ isActive }) =>
            isActive
              ? 'text-green-500'
              : 'text-slate-400'
          }
        >
          <User size={22} />
        </NavLink>
      </div>
    </div>
  );
}