import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  TrendingUp,
  CreditCard,
  ChevronRight,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

const stats = [
  {
    label: 'Membres total',
    value: '524',
    change: '+12 ce mois',
    icon: <Users size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
  {
    label: 'Programmes actifs',
    value: '4',
    change: '2 en cours',
    icon: <BookOpen size={18} />,
    color: 'bg-lime-bright/10 text-lime-bright',
  },
  {
    label: 'Revenus ce mois',
    value: '248 500 MRU',
    change: '+18% vs mois dernier',
    icon: <CreditCard size={18} />,
    color: 'bg-navy-deep/10 text-navy-deep',
  },
  {
    label: 'Taux de complétion',
    value: '67%',
    change: '+5% vs mois dernier',
    icon: <TrendingUp size={18} />,
    color: 'bg-teal-dark/10 text-teal-dark',
  },
];

const recentUsers = [
  { initials: 'KD', name: 'Kofi Diallo', email: 'kofi@email.com', plan: 'Pro', status: 'Actif', color: 'bg-teal-dark' },
  { initials: 'FT', name: 'Fatou Traoré', email: 'fatou@email.com', plan: 'Gratuit', status: 'Actif', color: 'bg-navy-deep' },
  { initials: 'MB', name: 'Moussa Ba', email: 'moussa@email.com', plan: 'Pro', status: 'Actif', color: 'bg-lime-bright' },
  { initials: 'SA', name: 'Salimata Amadou', email: 'salimata@email.com', plan: 'Gratuit', status: 'Inactif', color: 'bg-teal-dark' },
  { initials: 'YC', name: 'Youssef Cherif', email: 'youssef@email.com', plan: 'Pro', status: 'Actif', color: 'bg-navy-deep' },
];

const alerts = [
  { text: '3 nouveaux signalements dans la communauté', type: 'warning' },
  { text: '12 inscriptions en attente de validation', type: 'info' },
  { text: 'Le bootcamp du 1 Mai est complet', type: 'success' },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Vue d'ensemble de la plateforme Open!
          </p>
        </div>
        <span className="bg-navy-deep text-white text-xs font-bold px-4 py-2 rounded-full">
          Super Admin
        </span>
      </div>

      {/* Alerts */}
      <div className="flex flex-col gap-2">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold ${
              alert.type === 'warning'
                ? 'bg-orange-50 text-orange-600 border border-orange-100'
                : alert.type === 'info'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-lime-bright/10 text-teal-dark border border-lime-bright/20'
            }`}
          >
            <AlertCircle size={15} />
            {alert.text}
          </div>
        ))}
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
            <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Membres récents</h2>
          <Link
            to="/dashboard/admin/users"
            className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
          >
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Membre
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentUsers.map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${user.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      user.plan === 'Pro'
                        ? 'bg-teal-dark/10 text-teal-dark'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      user.status === 'Actif'
                        ? 'bg-lime-bright/10 text-teal-dark'
                        : 'bg-red-50 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1">
                      <UserCheck size={13} />
                      Gérer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Programs Overview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Aperçu des programmes</h2>
          <Link
            to="/dashboard/admin/programs"
            className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1"
          >
            Gérer <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Digital Skills Bootcamp', enrolled: 28, total: 30, progress: 93 },
            { title: 'AI For Everyone', enrolled: 45, total: 50, progress: 90 },
            { title: 'Tech Career Launchpad', enrolled: 18, total: 20, progress: 90 },
            { title: 'Innovation Lab', enrolled: 12, total: 15, progress: 80 },
          ].map((prog, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-bold text-slate-900">{prog.title}</h3>
                <span className="text-xs text-slate-400 font-medium">
                  {prog.enrolled}/{prog.total} inscrits
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Remplissage</span>
                <span className="font-bold text-teal-dark">{prog.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-full bg-lime-bright rounded-full"
                  style={{ width: `${prog.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}