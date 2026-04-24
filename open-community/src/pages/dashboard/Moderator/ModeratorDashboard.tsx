import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  AlertTriangle,
  Users,
  CheckCircle,
  ChevronRight,
  Flag,
  Clock,
} from 'lucide-react';

const stats = [
  {
    label: 'Posts ce mois',
    value: '342',
    sub: '+47 cette semaine',
    icon: <MessageSquare size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
  {
    label: 'Signalements',
    value: '8',
    sub: '3 urgents',
    icon: <AlertTriangle size={18} />,
    color: 'bg-red-50 text-red-400',
  },
  {
    label: 'Membres actifs',
    value: '127',
    sub: 'En ligne maintenant',
    icon: <Users size={18} />,
    color: 'bg-lime-bright/10 text-lime-bright',
  },
  {
    label: 'Posts approuvés',
    value: '98%',
    sub: 'Taux de validation',
    icon: <CheckCircle size={18} />,
    color: 'bg-navy-deep/10 text-navy-deep',
  },
];

const reports = [
  { id: 1, user: 'Ibrahim Bah', content: 'Contenu inapproprié dans le feed principal', type: 'Contenu', priority: 'Urgent', time: 'Il y a 15 min' },
  { id: 2, user: 'Inconnu', content: 'Spam de liens dans la communauté', type: 'Spam', priority: 'Urgent', time: 'Il y a 45 min' },
  { id: 3, user: 'Kofi Diallo', content: 'Comportement agressif envers un membre', type: 'Comportement', priority: 'Normal', time: 'Il y a 2h' },
  { id: 4, user: 'Utilisateur anonyme', content: 'Fausse information partagée', type: 'Info', priority: 'Normal', time: 'Il y a 3h' },
];

const recentActivity = [
  { text: 'Post de Fatou Traoré approuvé', time: 'Il y a 5 min', icon: <CheckCircle size={13} />, color: 'text-lime-bright' },
  { text: 'Compte d\'Ibrahim Bah suspendu', time: 'Il y a 20 min', icon: <Flag size={13} />, color: 'text-red-400' },
  { text: '12 posts approuvés en masse', time: 'Il y a 1h', icon: <CheckCircle size={13} />, color: 'text-lime-bright' },
  { text: 'Signalement de spam traité', time: 'Il y a 2h', icon: <Flag size={13} />, color: 'text-red-400' },
  { text: 'Message de bienvenue épinglé', time: 'Il y a 3h', icon: <MessageSquare size={13} />, color: 'text-teal-dark' },
];

export default function ModeratorDashboard() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Bonjour, Youssef 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Voici l'état de la communauté aujourd'hui.
          </p>
        </div>
        <span className="bg-navy-deep/10 text-navy-deep text-xs font-bold px-4 py-2 rounded-full">
          Modérateur
        </span>
      </div>

      {/* Urgent alert */}
      <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-3">
        <AlertTriangle size={16} className="text-red-400 shrink-0" />
        <p className="text-sm font-semibold text-red-500">
          3 signalements urgents nécessitent ton attention immédiate.
        </p>
        <Link
          to="/dashboard/moderator/community"
          className="ml-auto text-xs font-bold text-red-500 hover:underline whitespace-nowrap"
        >
          Traiter maintenant →
        </Link>
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

      <div className="grid md:grid-cols-2 gap-6">

        {/* Reports */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900">Signalements récents</h2>
            <Link
              to="/dashboard/moderator/community"
              className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
            >
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
            {reports.map((report, idx) => (
              <div key={idx} className="flex items-start gap-4 px-5 py-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  report.priority === 'Urgent'
                    ? 'bg-red-50 text-red-400'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  <Flag size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-bold text-slate-900">{report.user}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      report.priority === 'Urgent'
                        ? 'bg-red-50 text-red-400'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{report.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{report.time}</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      {report.type}
                    </span>
                  </div>
                </div>
                <button className="text-xs font-bold text-teal-dark hover:underline shrink-0">
                  Traiter
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900">Activité récente</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 px-5 py-4">
                <div className={`${activity.color} shrink-0`}>
                  {activity.icon}
                </div>
                <p className="text-sm text-slate-700 flex-1">{activity.text}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                  <Clock size={11} />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}