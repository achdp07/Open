import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo1.png'
import { useAuth } from '../context/AuthContext';
import { User, Settings, LogOut, BookOpen } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'A propos', href: '#about' },
  { name: 'Programmes', href: '#programs' },
  { name: 'Evenements', href: '#events' },
];


const Navbar = () => {
  const {
  user,
  appRole,
  isAuthenticated,
  logout
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Open Community" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-teal-dark transition-colors"
            >
              {link.name}
            </a>
          ))}

          {isAuthenticated ? (
  <div className="relative">
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-full bg-teal-dark text-white flex items-center justify-center font-bold">
        {user?.first_name?.[0]}
      </div>

      <div className="hidden lg:flex flex-col text-left">
        <span className="text-sm font-semibold text-slate-900">
          {user?.first_name}
        </span>
        <span className="text-xs text-slate-500">
          Mon espace
        </span>
      </div>
    </button>

    <AnimatePresence>
      {isProfileOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 top-14 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-4 py-4 border-b border-slate-100">
            <p className="font-semibold text-slate-900">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          <Link
            to={`/dashboard/${appRole}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <User size={16} />
            Tableau de bord
          </Link>

          <Link
            to="/dashboard/member/programs"
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <BookOpen size={16} />
            Mes programmes
          </Link>

          <Link
            to="/dashboard/member/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Settings size={16} />
            Paramètres
          </Link>

          <button
            onClick={() => {
            logout();
            navigate('/', { replace: true });
          }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </motion.div>
          )}
          </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/join"
              className="bg-teal-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Se connecter
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              
              <a
              key={link.name}
                href={link.href}
                className="text-lg font-medium text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

          {isAuthenticated ? (
            <Link
              to={`/dashboard/${appRole}`}
              onClick={() => setIsOpen(false)}
              className="bg-teal-dark text-white px-6 py-3 rounded-xl text-center font-semibold"
            >
              Mon espace
            </Link>
          ) : (
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="bg-teal-dark text-white px-6 py-3 rounded-xl text-center font-semibold"
            >
              Rejoindre la communauté
            </Link>
          )}

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;