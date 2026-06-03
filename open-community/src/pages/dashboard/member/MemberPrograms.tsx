import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, BarChart, CheckCircle, Lock } from 'lucide-react';
import { api } from '../../../services/api';
import { getModulesByProgram } from '../../../data/lessons';

// ── Interfaces TypeScript ──
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

interface EnrolledProgram {
  id: number;
  status: string;
  title: string;
  progress: number;
  start_date: string;
}

interface DashboardData {
  my_programs: EnrolledProgram[];
}

const getLevelLabel = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'beginner': return 'Débutant';
    case 'intermediate': return 'Intermédiaire';
    case 'advanced': return 'Avancé';
    default: return level;
  }
};

export default function MemberPrograms() {
  const navigate = useNavigate();

  // ── Tous les hooks en haut ──
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [enrolledPrograms, setEnrolledPrograms] = useState<EnrolledProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // const [completedLessons] = useState<string[]>(() => {
  //   const saved = localStorage.getItem('completedLessons');
  //   return saved ? JSON.parse(saved) : [];
  // });

  // ── Appels API ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel 1 — tous les programmes (pas d'auth)
        const programs = await api.getPrograms();
        setAllPrograms(programs);

        // Appel 2 — programmes inscrits (avec auth)
      const dashboard: DashboardData = await api.getDashboard();
      } catch {
        setError('Erreur lors du chargement des programmes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Les 3 états ──
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400 font-semibold text-sm">
        {error}
      </div>
    );
  }

  // ── Helpers ──
  const isEnrolled = (programId: number) =>
    enrolledPrograms.some((e) => e.id === programId);

  const getEnrolledData = (programId: number) =>
    enrolledPrograms.find((e) => e.id === programId);

  const navigateToFirstLesson = (programId: number) => {
    // Cherche dans les données locales
    const programIdStr = String(programId);
    const modules = getModulesByProgram(programIdStr);
    const firstLesson = modules[0]?.lessons[0];
    if (firstLesson) {
      navigate(
        `/dashboard/member/programs/${programIdStr}/modules/${firstLesson.moduleId}/lessons/${firstLesson.id}`
      );
    }
  };

  // Sépare programmes inscrits et non inscrits
  const myPrograms = allPrograms.filter((p) => isEnrolled(p.id));
  const otherPrograms = allPrograms.filter((p) => !isEnrolled(p.id));

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mes programmes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Suis ta progression et continue tes apprentissages.
        </p>
      </div>

      {/* Enrolled Programs */}
      {myPrograms.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">
            En cours
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {myPrograms.map((program, idx) => {
              const enrolled = getEnrolledData(program.id);
              const progress = enrolled?.progress ?? 0;
              const status = enrolled?.status ?? 'En cours';

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6"
                >
                  {/* Status + Level */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark">
                      {status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {getLevelLabel(program.level)}
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="font-black text-slate-900 text-lg mb-1">
                    {program.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Meta */}
                  <div className="flex gap-4 mb-4">
                    {program.open_cohorts[0] && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock size={13} />
                        Début {new Date(program.open_cohorts[0].start_date)
                          .toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                          })}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <BarChart size={13} />
                      {getLevelLabel(program.level)}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Progression</span>
                    <span className="font-bold text-teal-dark">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full mb-5">
                    <div
                      className="h-full bg-lime-bright rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigateToFirstLesson(program.id)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-teal-dark text-white text-sm font-bold hover:opacity-90 transition-all"
                  >
                    Continuer
                    <ChevronRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {myPrograms.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <p className="text-slate-400 font-semibold mb-4">
            Tu n'es inscrit à aucun programme pour le moment.
          </p>
          <Link
            to="/programs"
            className="bg-teal-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all inline-block"
          >
            Explorer les programmes
          </Link>
        </div>
      )}

      {/* Other Programs */}
      {otherPrograms.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Explorer d'autres programmes
            </h2>
            <Link
              to="/programs"
              className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
            >
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {otherPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                    {getLevelLabel(program.level)}
                  </span>
                  {program.open_cohorts.length === 0 && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Lock size={11} />
                      Aucune cohorte
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{program.title}</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {program.description}
                </p>

                {/* Cohort info */}
                {program.open_cohorts[0] && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <CheckCircle size={12} className="text-lime-bright" />
                    Début {new Date(program.open_cohorts[0].start_date)
                      .toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    {' '}— {program.open_cohorts[0].max_students} places
                  </div>
                )}

                <Link
                  to={`/programs/${program.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-slate-100 text-sm font-bold text-slate-700 hover:border-teal-dark hover:text-teal-dark transition-all"
                >
                  Voir le programme
                  <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}