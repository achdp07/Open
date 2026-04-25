import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { programs } from '../data/programs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main 

      className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-16">
            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-teal-dark transition-colors mb-6 inline-block"
            >
              ← Retour à l'accueil
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Nos <span className="text-teal-dark">programmes</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Des parcours intensifs et pratiques pour transformer votre passion en expertise.
              Choisissez le programme qui correspond à votre niveau et vos objectifs.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all group"
              >
                {/* Tag + Arrow */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-teal-dark/10 text-teal-dark rounded-full text-xs font-bold uppercase tracking-wider">
                    {program.tag}
                  </span>
                  <Link
                    to={`/programs/${program.id}`}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-dark group-hover:text-white transition-all"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Title + Desc */}
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{program.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-8">{program.desc}</p>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Durée</p>
                    <p className="text-sm font-bold text-slate-900">{program.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Niveau</p>
                    <p className="text-sm font-bold text-slate-900">{program.level}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Places</p>
                    <p className="text-sm font-bold text-slate-900">{program.spots} disponibles</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/programs/${program.id}`}
                  className="mt-6 w-full py-3 rounded-xl bg-teal-dark text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-darker transition-all group/btn"
                >
                  Voir le programme
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>

              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}


