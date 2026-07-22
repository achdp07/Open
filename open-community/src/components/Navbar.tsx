import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//useSearchParams to be added in react-router-dom
import logo from '../assets/images/logo1.webp'
import { useAuth } from '../context/AuthContext';
import { User, Settings, LogOut, BookOpen } from 'lucide-react';
//import HandleRegistration from './HandleRegistration';
import HandleClosure from './HandleClosure';


import RegistrationModal from './RegistrationModal';

type NavLink = 
  | { name: string; type: "page"; to: string }
  | { name: string; type: "section"; id: string };



  const navLinks: NavLink[] = [ // ✨ Added type annotation here
  { name: "Accueil", type: "page", to: "/" },
  { name: "IndabaX", type: "page", to: "/indabax" },
  { name: "À propos", type: "section", id: "about" },
  { name: "Programmes", type: "section", id: "programs" },
  { name: "Événements", type: "section", id: "events" },
];



const Navbar = () => {
  // const [searchParams] = useSearchParams();
   const [showSelectedEvent, setSelectedEvent] = useState(false);
  // useEffect(() => {
  //   if (searchParams.get("register") === "true") {
  //     setSelectedEvent(true);
  //   }
  // }, [searchParams]);

  const location = useLocation();

  const navigateTo = (link: NavLink) => { // ✨ Uses the new NavLink union type
    if (link.type === "page") {
      navigate(link.to); // TypeScript now knows 'to' is guaranteed to exist
      return;
    }
  
    // already on home
    if (location.pathname === "/") {
      document
        .getElementById(link.id) // TypeScript now knows 'id' is guaranteed to exist
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate(`/#${link.id}`);
    }
  
    setIsOpen(false);
  };




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
            
          <button
            key={link.name}
            onClick={() => navigateTo(link)}
            className="text-sm font-medium text-slate-600 hover:text-teal-dark transition-colors"
          >
            {link.name}
          </button>

            

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
            <button
              onClick={HandleClosure}
              //to='/join'
              className="bg-teal-dark text-white px-6 py-2.5 rounded-2xl text-sm font-semibold"
            >
              S'inscrire
            </button>
            
          )}

          <RegistrationModal
            isOpen={showSelectedEvent}
            onClose={() => setSelectedEvent(false)}
            eventSlug="indabax-mr-2026"
            eventTitle="IndabaX Mauritanie 2026"
          />
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
              
              <button
              key={link.name}
              onClick={() => navigateTo(link)}
                className="text-lg font-medium text-slate-600 text-left rounded-2xl"
              >
                {link.name}
              </button>
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
              to="/indabax?register=true"
              onClick={() => setIsOpen(false)}
              className="bg-teal-dark text-white px-6 py-3 rounded-2xl text-center font-semibold"
            >
              S'inscrire à IndabaX
            </Link>
          )}

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;