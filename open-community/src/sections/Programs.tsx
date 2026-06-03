import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface Cohort {
  id: number;
  start_date: string;
  end_date: string;
  max_students: number;
}

interface Program {
  id: number;
  title: string;
  description: string;
  level: string;
  open_cohorts: Cohort[];
}

const getLevelLabel = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'beginner': return 'Débutant';
    case 'intermediate': return 'Intermédiaire';
    case 'advanced': return 'Avancé';
    default: return level;
  }
};

const Programs = () => {
  // ── Hooks en haut ──
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Appel API ──
  useEffect(() => {
    api.getPrograms()
      .then(setPrograms)
      .catch(() => setError('Erreur lors du chargement'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="programs" className="py-24 bg-teal-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-lime-bright skew-x-12 -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos programmes</h2>
            <p className="text-slate-400 max-w-xl">
              Des parcours intensifs et pratiques pour transformer votre passion en expertise.
            </p>
          </div>
          <Link
            to="/programs"
            className="text-slate-200 font-bold flex items-center gap-2 hover:text-white transition-colors group"
          >
            Voir tous les programmes
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div>   
          </div>
        )}

        {/* Programs Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-3 gap-8">
            {programs.slice(0, 4).map((prog, idx) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
              >
                {/* Tag + Arrow */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/20 text-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
                    {getLevelLabel(prog.level)}
                  </span>
                  <Link
                    to={`/programs/${prog.id}`}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Title + Desc */}
                <h3 className="text-2xl font-bold mb-4">{prog.title}</h3>
                <p className="text-slate-200 leading-relaxed mb-6">
                  {prog.description}
                </p>

                {/* Cohort info */}
                {prog.open_cohorts.length > 0 ? (
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">
                        Début
                      </p>
                      <p className="text-sm font-bold text-white">
                        {new Date(prog.open_cohorts[0].start_date)
                          .toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">
                        Places
                      </p>
                      <p className="text-sm font-bold text-white">
                        {prog.open_cohorts[0].max_students} disponibles
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/40 font-semibold">
                      Aucune cohorte ouverte
                    </p>
                  </div>
                )}

              </motion.div>
            ))}

            {/* Empty state */}
            {programs.length === 0 && (
              <div className="col-span-2 text-center py-12 text-white/40 font-semibold">
                Aucun programme disponible pour le moment.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Programs;