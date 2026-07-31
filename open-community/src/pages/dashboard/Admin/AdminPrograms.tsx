import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreHorizontal,
  Users,
  Clock,
  BarChart,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import programs from '../../../data/programs';

type Status = 'Actif' | 'Brouillon' | 'Archivé';

const programStats = [
  { id: 'digital-skills-bootcamp', enrolled: 28, total: 30, status: 'Actif' as Status, revenue: '138 600 MRU' },
  { id: 'ai-for-everyone', enrolled: 45, total: 50, status: 'Actif' as Status, revenue: '220 500 MRU' },
  { id: 'tech-career-launchpad', enrolled: 18, total: 20, status: 'Actif' as Status, revenue: '88 200 MRU' },
  { id: 'innovation-lab', enrolled: 12, total: 15, status: 'Brouillon' as Status, revenue: '58 800 MRU' },
];

const statusColors: Record<Status, string> = {
  Actif: 'bg-lime-bright/10 text-teal-dark',
  Brouillon: 'bg-slate-100 text-slate-500',
  Archivé: 'bg-red-50 text-red-400',
};

export default function AdminPrograms() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'tous' | Status>('tous');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = programs.filter((p) => {
    const stats = programStats.find((s) => s.id === p.id);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'tous' || stats?.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Programmes</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérer et suivre tous les programmes de la plateforme.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
          <Plus size={15} />
          Nouveau programme
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total programmes', value: programs.length },
          { label: 'Programmes actifs', value: programStats.filter((p) => p.status === 'Actif').length },
          { label: 'Inscrits total', value: programStats.reduce((a, b) => a + b.enrolled, 0) },
          { label: 'Places restantes', value: programStats.reduce((a, b) => a + (b.total - b.enrolled), 0) },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex-1 min-w-48">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un programme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none flex-1"
          />
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(['tous', 'Actif', 'Brouillon', 'Archivé'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-white text-teal-dark shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {s === 'tous' ? 'Tous' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((program, idx) => {
          const stats = programStats.find((s) => s.id === program.id);
          if (!stats) return null;
          const fillPercent = Math.round((stats.enrolled / stats.total) * 100);

          return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 relative"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[stats.status]}`}>
                  {stats.status}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === program.id ? null : program.id)}
                    className="text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {openMenuId === program.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-7 bg-white border border-slate-100 rounded-xl shadow-lg p-1 z-10 w-40"
                    >
                      <Link
                        to={`/programs/${program.id}`}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Eye size={13} /> Voir
                      </Link>
                      <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg w-full">
                        <Pencil size={13} /> Modifier
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-50 rounded-lg w-full">
                        <Trash2 size={13} /> Archiver
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-base font-black text-slate-900 mb-1">{program.title}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{program.desc}</p>

              {/* Meta */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={13} />
                  {program.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <BarChart size={13} />
                  {program.level}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={13} />
                  {stats.enrolled}/{stats.total}
                </div>
              </div>

              {/* Progress */}
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Remplissage</span>
                <span className="font-bold text-teal-dark">{fillPercent}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full mb-4">
                <div
                  className="h-full bg-lime-bright rounded-full"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>

              {/* Revenue */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-400 font-medium">Revenus générés</span>
                <span className="text-sm font-black text-slate-900">{stats.revenue}</span>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}