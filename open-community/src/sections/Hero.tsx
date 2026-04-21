import { ChevronRight, Zap } from 'lucide-react';
import heroImage from '../assets/images/Hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-20 overflow-hidden md:min-h-screen md:flex md:items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#005C53] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            Génération Numérique
          </div>
          <h1 className="text-5xl md:text-5xl font-bold text-slate-900 leading-[1.1] mb-6">
            Open Community ! Construire la <span className="text-[#005C53]">génération</span> numérique
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            Une communauté qui forme les jeunes aux compétences numériques, à l'innovation et aux technologies de demain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/join" className="bg-[#005C53] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004C43] transition-all shadow-xl shadow-[#005C53]/20 flex items-center gap-2 group">
              Rejoindre la communauté
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/programs" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold hover:border-[#005C53] hover:text-[#005C53] transition-all">
              Nos programmes
            </Link>
          </div>
        </div>

        {/* Right */}
        <div
          className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] justify-center flex">
            <img src={heroImage} alt="hero" className="rounded-[2.5rem] w-80 object-contain" />
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#005C53] rounded-3xl -z-10 rotate-12"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#9FC131] rounded-full -z-10 opacity-50"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;