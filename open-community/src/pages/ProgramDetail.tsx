import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart, Users, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Cohort {
  id: number;
  start_date: string;
  end_date: string;
  max_students: number;
}

interface Program {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives: string[];
  level: string;
  language: string;
  duration_weeks: number;
  image: string | null;
  open_cohorts: Cohort[];
}

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    city: '',
    motivation: '',
  });

  useEffect(() => {
    if (!id) return;
    api.getProgramById(id)
      .then(setProgram)
      .catch(() => setError('Programme introuvable'))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;

    if (!user) {
      navigate('/join');
      return;
    }

    setIsEnrolling(true);
    setError('');
    try {
      await api.enrollProgram(program.id);
      setEnrolled(true);
    } catch (err: any) {
      const msg = JSON.parse(err.message || '{}');
      setError(msg?.detail || 'Erreur lors de l\'inscription');
    } finally {
      setIsEnrolling(false);
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          {error || 'Programme introuvable'}
        </h1>
        <Link to="/programs" className="text-teal-dark font-semibold hover:underline">
          ← Voir tous les programmes
        </Link>
      </div>
    );
  }

  const activeCohort = program.open_cohorts[0];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-dark transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <div className="grid md:grid-cols-3 gap-12">

            {/* Left — Program Info */}
            <div className="md:col-span-2 flex flex-col gap-10">

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="px-3 py-1 bg-teal-dark/10 text-teal-dark rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                  {getLevelLabel(program.level)}
                </span>
                <h1 className="text-4xl font-black text-slate-900 mb-4">
                  {program.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {program.description}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {program.objectives}
                </p>
                {/* <p className="text-lg text-slate-600 leading-relaxed">
                  {program.language}
                </p> */}

                {/* <p className="text-lg text-slate-600 leading-relaxed">
                  {program.duration_weeks} semaines
                </p> */}
              </motion.div>

              {/* Meta cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <BarChart size={18} />,
                    label: 'Niveau',
                    value: getLevelLabel(program.level),
                  },
                  {
                    icon: <Users size={18} />,
                    label: 'Places',
                    value: activeCohort
                      ? `${activeCohort.max_students} places`
                      : 'Sur liste d\'attente',
                  },
                  {
                    icon: <Clock size={18} />,
                    label: 'Début',
                    value: activeCohort
                      ? new Date(activeCohort.start_date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                        })
                      : 'À confirmer',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-teal-dark mb-2">{item.icon}</div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cohorts */}
              {program.open_cohorts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Cohortes disponibles
                  </h2>
                  <div className="flex flex-col gap-3">
                    {program.open_cohorts.map((cohort) => (
                      <div
                        key={cohort.id}
                        className="flex items-center justify-between bg-slate-50 rounded-2xl p-5"
                      >
                        <div className="flex items-center gap-4">
                          <CheckCircle size={20} className="text-lime-bright" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              Cohorte #{cohort.id}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Du{' '}
                              {new Date(cohort.start_date).toLocaleDateString('fr-FR')}
                              {' '}au{' '}
                              {new Date(cohort.end_date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-teal-dark bg-teal-dark/10 px-3 py-1.5 rounded-full">
                          {cohort.max_students} places
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right — Registration Form */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">

                  {enrolled ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center gap-4 py-8"
                    >
                      <div className="w-16 h-16 bg-lime-bright/20 rounded-full flex items-center justify-center">
                        <CheckCircle size={32} className="text-lime-bright" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Inscription confirmée !
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Tu es maintenant inscrit(e) au programme.
                        Va dans ton dashboard pour accéder au contenu.
                      </p>
                      <Link
                        to="/dashboard/member/programs"
                        className="bg-teal-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                      >
                        Voir mes programmes →
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          S'inscrire
                        </h3>
                        {activeCohort && (
                          <p className="text-sm text-slate-500">
                            Début le{' '}
                            <span className="font-semibold text-teal-dark">
                              {new Date(activeCohort.start_date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Error */}
                      {error && (
                        <div className="bg-red-50 text-red-500 text-xs font-semibold px-3 py-2.5 rounded-xl mb-4">
                          {error}
                        </div>
                      )}

                      {/* Not logged in warning */}
                      {!user && (
                        <div className="bg-teal-dark/5 border border-teal-dark/20 rounded-xl p-4 mb-4 flex items-start gap-3">
                          <Lock size={15} className="text-teal-dark shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Tu dois être connecté pour t'inscrire.{' '}
                            <Link
                              to="/"
                              className="text-teal-dark font-bold hover:underline"
                            >
                              Se connecter
                            </Link>
                          </p>
                        </div>
                      )}

                      <form onSubmit={handleEnroll} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600">
                              Prénom
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="Prénom"
                              value={form.firstName}
                              onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                              }
                              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600">
                              Nom
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="Nom"
                              value={form.lastName}
                              onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                              }
                              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">
                            Email
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="ton@email.com"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            placeholder="+222 xx xx xx xx"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">
                            Ville
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Ta ville"
                            value={form.city}
                            onChange={(e) =>
                              setForm({ ...form, city: e.target.value })
                            }
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">
                            Motivation
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Pourquoi ce programme ?"
                            value={form.motivation}
                            onChange={(e) =>
                              setForm({ ...form, motivation: e.target.value })
                            }
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isEnrolling || !activeCohort}
                          className="bg-teal-dark text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
                        >
                          {isEnrolling
                            ? 'Inscription...'
                            : !activeCohort
                            ? 'Aucune cohorte ouverte'
                            : 'Envoyer ma candidature'}
                          {!isEnrolling && activeCohort && (
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}