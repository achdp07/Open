import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

const stats = [
  {
    label: 'Mes programmes',
    value: '2',
    sub: 'Actifs',
    icon: <BookOpen size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
  {
    label: 'Total apprenants',
    value: '73',
    sub: '+8 ce mois',
    icon: <Users size={18} />,
    color: 'bg-lime-bright/10 text-lime-bright',
  },
  {
    label: 'Taux de complétion',
    value: '67%',
    sub: 'Moyenne globale',
    icon: <TrendingUp size={18} />,
    color: 'bg-navy-deep/10 text-navy-deep',
  },
  {
    label: 'Note moyenne',
    value: '4.8',
    sub: 'Sur 5 étoiles',
    icon: <Star size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
];

const myPrograms = [
  {
    id: 'digital-skills-bootcamp',
    title: 'Digital Skills Bootcamp',
    learners: 28,
    total: 30,
    completion: 67,
    rating: 4.9,
  },
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    learners: 45,
    total: 50,
    completion: 52,
    rating: 4.7,
  },
];

const recentLearners = [
  { initials: 'KD', name: 'Kofi Diallo', program: 'Digital Skills Bootcamp', progress: 42, color: 'bg-teal-dark' },
  { initials: 'FT', name: 'Fatou Traoré', program: 'AI For Everyone', progress: 78, color: 'bg-navy-deep' },
  { initials: 'MB', name: 'Moussa Ba', program: 'Digital Skills Bootcamp', progress: 91, color: 'bg-lime-bright' },
  { initials: 'SA', name: 'Salimata Amadou', program: 'AI For Everyone', progress: 35, color: 'bg-teal-dark' },
];

export default function InstructorDashboard() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Bonjour, Moussa 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Voici l'aperçu de tes programmes et apprenants.
          </p>
        </div>
        <span className="bg-teal-dark/10 text-teal-dark text-xs font-bold px-4 py-2 rounded-full">
          Instructeur
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white border border-slate-100 rounded-2xl p-5"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* My Programs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Mes programmes</h2>
          <Link
            to="/dashboard/instructor/programs"
            className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
          >
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {myPrograms.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-slate-900">{prog.title}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  {prog.rating}
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={13} />
                  {prog.learners}/{prog.total} apprenants
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle size={13} />
                  {prog.completion}% complétion
                </div>
              </div>

              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Remplissage</span>
                <span className="font-bold text-teal-dark">
                  {Math.round((prog.learners / prog.total) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full mb-4">
                <div
                  className="h-full bg-lime-bright rounded-full"
                  style={{ width: `${Math.round((prog.learners / prog.total) * 100)}%` }}
                />
              </div>

              <Link
                to="/dashboard/instructor/programs"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-slate-100 text-sm font-bold text-slate-700 hover:border-teal-dark hover:text-teal-dark transition-all"
              >
                Gérer <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Learners */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Apprenants récents</h2>
          <Link
            to="/dashboard/instructor/learners"
            className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
          >
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
          {recentLearners.map((learner, idx) => (
            <div key={idx} className="flex items-center gap-4 px-6 py-4">
              <div className={`w-9 h-9 rounded-full ${learner.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                {learner.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{learner.name}</p>
                <p className="text-xs text-slate-400">{learner.program}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full">
                  <div
                    className="h-full bg-lime-bright rounded-full"
                    style={{ width: `${learner.progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 w-8">
                  {learner.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}