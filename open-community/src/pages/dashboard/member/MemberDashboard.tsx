import { Calendar, Users, TrendingUp, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { programs } from '../../../data/programs';

const stats = [
  {
    label: 'Progression',
    value: '42%',
    sub: 'Digital Skills Bootcamp',
    icon: <TrendingUp size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
  {
    label: 'Modules terminés',
    value: '5/12',
    sub: 'Ce mois-ci',
    icon: <CheckCircle size={18} />,
    color: 'bg-lime-bright/10 text-lime-bright',
  },
  {
    label: 'Événements',
    value: '2',
    sub: 'Inscriptions actives',
    icon: <Calendar size={18} />,
    color: 'bg-navy-deep/10 text-navy-deep',
  },
  {
    label: 'Communauté',
    value: '127',
    sub: 'Membres en ligne',
    icon: <Users size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
];

const myPrograms = [
  {
    id: 'digital-skills-bootcamp',
    title: 'Digital Skills Bootcamp',
    module: 'Module 5 — JavaScript les bases',
    progress: 42,
    status: 'En cours',
  },
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    module: 'Démarre le 1 Juin 2026',
    progress: 0,
    status: 'À venir',
  },
];

const feedItems = [
  { initials: 'KD', name: 'Kofi Diallo', text: 'Je viens de terminer le module CSS — merci à tous !', time: 'Il y a 12 min', color: 'bg-teal-dark' },
  { initials: 'FT', name: 'Fatou Traoré', text: 'Quelqu\'un a des ressources sur les API REST ?', time: 'Il y a 34 min', color: 'bg-navy-deep' },
  { initials: 'MB', name: 'Moussa Ba', text: 'Mon portfolio est en ligne ! Feedback bienvenu.', time: 'Il y a 1h', color: 'bg-lime-bright' },
];

export default function MemberDashboard() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bonjour, Aminata 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Continue sur ta lancée !</p>
        </div>
        <span className="bg-lime-bright/15 text-teal-dark text-xs font-bold px-4 py-2 rounded-full">
          Plan Gratuit
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* My Programs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Mes programmes</h2>
          <Link to="/dashboard/member/programs" className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {myPrograms.map((prog, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  prog.status === 'En cours'
                    ? 'bg-teal-dark/10 text-teal-dark'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {prog.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{prog.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{prog.module}</p>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Progression</span>
                <span>{prog.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-full bg-lime-bright rounded-full transition-all"
                  style={{ width: `${prog.progress}%` }}
                />
              </div>
              <Link
                to={`/programs/${prog.id}`}
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-slate-100 text-sm font-bold text-slate-700 hover:border-teal-dark hover:text-teal-dark transition-all"
              >
                Continuer <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-navy-deep rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-white font-bold text-base mb-1">
            Passe au plan Pro et débloque tout
          </h3>
          <p className="text-slate-400 text-sm">
            Accès illimité aux programmes, certificats, sessions live et ressources exclusives.
          </p>
        </div>
        <Link
          to="/dashboard/member/subscription"
          className="bg-lime-bright text-white px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap hover:opacity-90 transition-all"
        >
          Voir les plans →
        </Link>
      </div>

      {/* Community Feed */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Communauté — Feed</h2>
          <Link to="/dashboard/member/community" className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
          {feedItems.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-5">
              <div className={`w-9 h-9 rounded-full ${item.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                {item.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{item.text}</p>
                <p className="text-xs text-slate-400 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}