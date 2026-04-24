import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, BarChart, Users, CheckCircle, Clock } from 'lucide-react';

interface Learner {
  id: number;
  initials: string;
  name: string;
  email: string;
  program: string;
  progress: number;
  status: 'En cours' | 'Terminé' | 'Inactif';
  lastActive: string;
  color: string;
}

const learners: Learner[] = [
  { id: 1, initials: 'KD', name: 'Kofi Diallo', email: 'kofi@email.com', program: 'Digital Skills Bootcamp', progress: 42, status: 'En cours', lastActive: 'Il y a 2h', color: 'bg-teal-dark' },
  { id: 2, initials: 'FT', name: 'Fatou Traoré', email: 'fatou@email.com', program: 'AI For Everyone', progress: 78, status: 'En cours', lastActive: 'Il y a 30 min', color: 'bg-navy-deep' },
  { id: 3, initials: 'MB', name: 'Moussa Ba', email: 'moussa@email.com', program: 'Digital Skills Bootcamp', progress: 100, status: 'Terminé', lastActive: 'Il y a 3 jours', color: 'bg-lime-bright' },
  { id: 4, initials: 'SA', name: 'Salimata Amadou', email: 'salimata@email.com', program: 'AI For Everyone', progress: 35, status: 'En cours', lastActive: 'Il y a 1 jour', color: 'bg-teal-dark' },
  { id: 5, initials: 'YC', name: 'Youssef Cherif', email: 'youssef@email.com', program: 'Digital Skills Bootcamp', progress: 91, status: 'En cours', lastActive: 'Il y a 5h', color: 'bg-navy-deep' },
  { id: 6, initials: 'ND', name: 'Nadia Diop', email: 'nadia@email.com', program: 'AI For Everyone', progress: 15, status: 'Inactif', lastActive: 'Il y a 2 semaines', color: 'bg-teal-dark' },
  { id: 7, initials: 'IB', name: 'Ibrahim Bah', email: 'ibrahim@email.com', program: 'Digital Skills Bootcamp', progress: 60, status: 'En cours', lastActive: 'Il y a 1h', color: 'bg-lime-bright' },
  { id: 8, initials: 'AM', name: 'Awa Mbaye', email: 'awa@email.com', program: 'AI For Everyone', progress: 100, status: 'Terminé', lastActive: 'Il y a 5 jours', color: 'bg-navy-deep' },
];

type Filter = 'tous' | 'En cours' | 'Terminé' | 'Inactif';
type ProgramFilter = 'tous' | 'Digital Skills Bootcamp' | 'AI For Everyone';

const statusColors: Record<string, string> = {
  'En cours': 'bg-teal-dark/10 text-teal-dark',
  'Terminé': 'bg-lime-bright/10 text-teal-dark',
  'Inactif': 'bg-red-50 text-red-400',
};

export default function InstructorLearners() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Filter>('tous');
  const [programFilter, setProgramFilter] = useState<ProgramFilter>('tous');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = learners.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'tous' || l.status === statusFilter;
    const matchProgram = programFilter === 'tous' || l.program === programFilter;
    return matchSearch && matchStatus && matchProgram;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((l) => l.id));
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mes apprenants</h1>
        <p className="text-slate-500 text-sm mt-1">
          Suis la progression de tes apprenants.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: learners.length, icon: <Users size={16} />, color: 'bg-teal-dark/10 text-teal-dark' },
          { label: 'En cours', value: learners.filter((l) => l.status === 'En cours').length, icon: <Clock size={16} />, color: 'bg-lime-bright/10 text-lime-bright' },
          { label: 'Terminés', value: learners.filter((l) => l.status === 'Terminé').length, icon: <CheckCircle size={16} />, color: 'bg-navy-deep/10 text-navy-deep' },
          { label: 'Progression moy.', value: `${Math.round(learners.reduce((a, b) => a + b.progress, 0) / learners.length)}%`, icon: <BarChart size={16} />, color: 'bg-teal-dark/10 text-teal-dark' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex-1 min-w-48">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un apprenant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none flex-1"
          />
        </div>

        {/* Status filter */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(['tous', 'En cours', 'Terminé', 'Inactif'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === f
                  ? 'bg-white text-teal-dark shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f === 'tous' ? 'Tous' : f}
            </button>
          ))}
        </div>

        {/* Program filter */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(['tous', 'Digital Skills Bootcamp', 'AI For Everyone'] as ProgramFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setProgramFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                programFilter === f
                  ? 'bg-white text-teal-dark shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f === 'tous' ? 'Tous les programmes' : f}
            </button>
          ))}
        </div>

      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-teal-dark/10 border border-teal-dark/20 rounded-xl px-5 py-3"
        >
          <span className="text-sm font-bold text-teal-dark">
            {selectedIds.length} sélectionné(s)
          </span>
          <button className="flex items-center gap-1.5 text-xs font-bold text-teal-dark bg-white px-4 py-2 rounded-xl hover:shadow-sm transition-all ml-auto">
            <Mail size={13} />
            Envoyer un message
          </button>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Apprenant
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Programme
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Progression
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Dernière activité
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((learner, idx) => (
              <motion.tr
                key={learner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(learner.id)}
                    onChange={() => toggleSelect(learner.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${learner.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                      {learner.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{learner.name}</p>
                      <p className="text-xs text-slate-400">{learner.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-600">
                    {learner.program}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-lime-bright rounded-full"
                        style={{ width: `${learner.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {learner.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[learner.status]}`}>
                    {learner.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-400">{learner.lastActive}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm font-semibold">
            Aucun apprenant trouvé
          </div>
        )}
      </div>

    </div>
  );
}