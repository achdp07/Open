import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo1.png'

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'A propos', href: '#about' },
  { name: 'Programmes', href: '#programs' },
  { name: 'Evenements', href: '#events' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <Link
            to="/join"
            className="bg-teal-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-darker transition-all shadow-lg shadow-teal-dark/20"
          >
            Rejoindre
          </Link>
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
            <Link
              to="/join"
              className="bg-teal-dark text-white px-6 py-3 rounded-xl text-center font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Rejoindre la communauté
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;