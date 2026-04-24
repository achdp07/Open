import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
//   Filter,
//   UserCheck,
  UserX,
  Mail,
  MoreHorizontal,
  Download,
} from 'lucide-react';

type Role = 'member' | 'instructor' | 'moderator' | 'admin';
type Status = 'Actif' | 'Inactif' | 'Suspendu';
type Plan = 'Gratuit' | 'Pro';

interface User {
  id: number;
  initials: string;
  name: string;
  email: string;
  role: Role;
  plan: Plan;
  status: Status;
  joined: string;
  color: string;
}

const allUsers: User[] = [
  { id: 1, initials: 'KD', name: 'Kofi Diallo', email: 'kofi@email.com', role: 'member', plan: 'Pro', status: 'Actif', joined: '12 Jan 2026', color: 'bg-teal-dark' },
  { id: 2, initials: 'FT', name: 'Fatou Traoré', email: 'fatou@email.com', role: 'member', plan: 'Gratuit', status: 'Actif', joined: '18 Jan 2026', color: 'bg-navy-deep' },
  { id: 3, initials: 'MB', name: 'Moussa Ba', email: 'moussa@email.com', role: 'instructor', plan: 'Pro', status: 'Actif', joined: '02 Fév 2026', color: 'bg-lime-bright' },
  { id: 4, initials: 'SA', name: 'Salimata Amadou', email: 'salimata@email.com', role: 'member', plan: 'Gratuit', status: 'Inactif', joined: '14 Fév 2026', color: 'bg-teal-dark' },
  { id: 5, initials: 'YC', name: 'Youssef Cherif', email: 'youssef@email.com', role: 'moderator', plan: 'Pro', status: 'Actif', joined: '20 Fév 2026', color: 'bg-navy-deep' },
  { id: 6, initials: 'ND', name: 'Nadia Diop', email: 'nadia@email.com', role: 'member', plan: 'Pro', status: 'Actif', joined: '01 Mar 2026', color: 'bg-teal-dark' },
  { id: 7, initials: 'IB', name: 'Ibrahim Bah', email: 'ibrahim@email.com', role: 'member', plan: 'Gratuit', status: 'Suspendu', joined: '05 Mar 2026', color: 'bg-lime-bright' },
  { id: 8, initials: 'AM', name: 'Awa Mbaye', email: 'awa@email.com', role: 'instructor', plan: 'Pro', status: 'Actif', joined: '10 Mar 2026', color: 'bg-navy-deep' },
];

const roleColors: Record<Role, string> = {
  member: 'bg-slate-100 text-slate-500',
  instructor: 'bg-teal-dark/10 text-teal-dark',
  moderator: 'bg-navy-deep/10 text-navy-deep',
  admin: 'bg-lime-bright/10 text-teal-dark',
};

const roleLabels: Record<Role, string> = {
  member: 'Membre',
  instructor: 'Instructeur',
  moderator: 'Modérateur',
  admin: 'Admin',
};

const statusColors: Record<Status, string> = {
  Actif: 'bg-lime-bright/10 text-teal-dark',
  Inactif: 'bg-slate-100 text-slate-400',
  Suspendu: 'bg-red-50 text-red-400',
};

type FilterRole = 'tous' | Role;

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<FilterRole>('tous');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = allUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'tous' || u.role === roleFilter;
    return matchSearch && matchRole;
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
      setSelectedIds(filtered.map((u) => u.id));
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Utilisateurs</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérer les membres, instructeurs et modérateurs.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
          <Download size={15} />
          Exporter
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: allUsers.length },
          { label: 'Membres', value: allUsers.filter((u) => u.role === 'member').length },
          { label: 'Instructeurs', value: allUsers.filter((u) => u.role === 'instructor').length },
          { label: 'Pro', value: allUsers.filter((u) => u.plan === 'Pro').length },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
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
            placeholder="Rechercher un membre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none flex-1"
          />
        </div>

        {/* Role filter */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {(['tous', 'member', 'instructor', 'moderator'] as FilterRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === r
                  ? 'bg-white text-teal-dark shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {r === 'tous' ? 'Tous' : roleLabels[r]}
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
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-1.5 text-xs font-bold text-teal-dark bg-white px-4 py-2 rounded-xl hover:shadow-sm transition-all">
              <Mail size={13} />
              Envoyer email
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-white px-4 py-2 rounded-xl hover:shadow-sm transition-all">
              <UserX size={13} />
              Suspendre
            </button>
          </div>
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
                Membre
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rôle
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Plan
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Inscrit le
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((user, idx) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                    className="rounded"
                  />
                </td>
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
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    user.plan === 'Pro'
                      ? 'bg-teal-dark/10 text-teal-dark'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-400">{user.joined}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm font-semibold">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>

    </div>
  );
}