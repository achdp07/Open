import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../services/api';

interface Program {
  id: number;
  title: string;
  description: string;
  level: string;
  open_cohorts: {
    id: number;
    start_date: string;
    end_date: string;
    max_students: number;
  }[];
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getPrograms()
      .then(setPrograms)
      .catch(() => setError('Erreur lors du chargement des programmes'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-lime-bright/10 text-teal-dark';
      case 'intermediate': return 'bg-blue-50 text-blue-500';
      case 'advanced': return 'bg-orange-50 text-orange-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="pt-32 pb-24">
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
              Des parcours intensifs et pratiques pour transformer
              votre passion en expertise.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-8">
              {error}
            </div>
          )}

          {/* Programs Grid */}
          {!isLoading && !error && (
            <div className="grid md:grid-cols-3 gap-8">
              {programs.length === 0 ? (
                <div className="col-span-2 text-center py-16 text-slate-400 font-semibold">
                  Aucun programme disponible pour le moment.
                </div>
              ) : (
                programs.map((program, idx) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all group"
                  >
                    {/* Tag + Arrow */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getLevelColor(program.level)}`}>
                        {getLevelLabel(program.level)}
                      </span>
                      <Link
                        to={`/programs/${program.id}`}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-dark group-hover:text-white transition-all"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Title + Desc */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {program.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      {program.description}
                    </p>

                    {/* Cohorts */}
                    {program.open_cohorts.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                            Début
                          </p>
                          <p className="text-sm font-bold text-slate-900">
                            {new Date(program.open_cohorts[0].start_date)
                              .toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                            Places
                          </p>
                          <p className="text-sm font-bold text-slate-900">
                            {program.open_cohorts[0].max_students} disponibles
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-6 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-semibold">
                          Aucune cohorte ouverte pour le moment
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      to={`/programs/${program.id}`}
                      className="mt-6 w-full py-3 rounded-xl bg-teal-dark text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all group/btn"
                    >
                      Voir le programme
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}