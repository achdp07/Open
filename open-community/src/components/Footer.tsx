import { } from 'lucide-react'
// import { Link } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-teal-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-2">
            <img src={logo} alt="Open Community" className="h-10 object-contain mb-6" />
            <p className="text-slate-400 max-w-sm mb-8">
              Construire la génération numérique en formant les jeunes aux compétences de demain.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/OpenCommunity" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-bright transition-all">
                <FaFacebook size={20} />
              </a>
              <a href="https://whatsapp.com/channel/0029VbBCdmQ7Noa9lMXoZo3Y" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-bright transition-all">
                <FaWhatsapp size={20} /> 
              </a>
              <a href="https://linkedin.com/company/openmr1" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-bright transition-all">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">A propos</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Programmes</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Evenements</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>openmr.contact@gmail.com</li>
              <li>+222 41 05 21 18</li>
              <li>Nouakchott, Mauritanie</li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Open Community. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;