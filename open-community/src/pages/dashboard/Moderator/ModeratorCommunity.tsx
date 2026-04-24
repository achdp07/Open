import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Flag,
  CheckCircle,
  Trash2,
  UserX,
  MessageSquare,
  AlertTriangle,
  Pin,
  Eye,
} from 'lucide-react';

type ReportStatus = 'En attente' | 'Traité' | 'Ignoré';
type ReportPriority = 'Urgent' | 'Normal';
type PostStatus = 'Approuvé' | 'En attente' | 'Supprimé';

interface Report {
  id: number;
  user: string;
  initials: string;
  content: string;
  type: string;
  priority: ReportPriority;
  status: ReportStatus;
  time: string;
  color: string;
}

interface Post {
  id: number;
  initials: string;
  name: string;
  content: string;
  time: string;
  status: PostStatus;
  reports: number;
  color: string;
}

const reports: Report[] = [
  { id: 1, user: 'Ibrahim Bah', initials: 'IB', content: 'Contenu inapproprié dans le feed principal', type: 'Contenu', priority: 'Urgent', status: 'En attente', time: 'Il y a 15 min', color: 'bg-lime-bright' },
  { id: 2, user: 'Inconnu', initials: '??', content: 'Spam de liens dans la communauté', type: 'Spam', priority: 'Urgent', status: 'En attente', time: 'Il y a 45 min', color: 'bg-red-400' },
  { id: 3, user: 'Kofi Diallo', initials: 'KD', content: 'Comportement agressif envers un membre', type: 'Comportement', priority: 'Normal', status: 'En attente', time: 'Il y a 2h', color: 'bg-teal-dark' },
  { id: 4, user: 'Utilisateur anonyme', initials: 'UA', content: 'Fausse information partagée', type: 'Info', priority: 'Normal', status: 'Traité', time: 'Il y a 3h', color: 'bg-slate-400' },
  { id: 5, user: 'Fatou Traoré', initials: 'FT', content: 'Lien vers contenu externe suspect', type: 'Spam', priority: 'Normal', status: 'Ignoré', time: 'Il y a 5h', color: 'bg-navy-deep' },
];

const posts: Post[] = [
  { id: 1, initials: 'KD', name: 'Kofi Diallo', content: 'Je viens de terminer le module CSS — merci à tous pour l\'aide !', time: 'Il y a 12 min', status: 'Approuvé', reports: 0, color: 'bg-teal-dark' },
  { id: 2, initials: 'FT', name: 'Fatou Traoré', content: 'Quelqu\'un a des ressources sur les API REST pour débutants ?', time: 'Il y a 34 min', status: 'Approuvé', reports: 0, color: 'bg-navy-deep' },
  { id: 3, initials: 'IB', name: 'Ibrahim Bah', content: 'Contenu signalé comme inapproprié par 3 membres...', time: 'Il y a 1h', status: 'En attente', reports: 3, color: 'bg-lime-bright' },
  { id: 4, initials: 'MB', name: 'Moussa Ba', content: 'Mon portfolio est en ligne ! Feedback bienvenu 🙏', time: 'Il y a 2h', status: 'Approuvé', reports: 0, color: 'bg-teal-dark' },
  { id: 5, initials: 'SA', name: 'Salimata Amadou', content: 'Liens suspects partagés — en attente de vérification', time: 'Il y a 3h', status: 'En attente', reports: 2, color: 'bg-navy-deep' },
];

type Tab = 'reports' | 'posts';
type ReportFilter = 'tous' | ReportStatus;
type PostFilter = 'tous' | PostStatus;

const reportStatusColors: Record<ReportStatus, string> = {
  'En attente': 'bg-orange-50 text-orange-500',
  'Traité': 'bg-lime-bright/10 text-teal-dark',
  'Ignoré': 'bg-slate-100 text-slate-400',
};

const postStatusColors: Record<PostStatus, string> = {
  'Approuvé': 'bg-lime-bright/10 text-teal-dark',
  'En attente': 'bg-orange-50 text-orange-500',
  'Supprimé': 'bg-red-50 text-red-400',
};

export default function ModeratorCommunity() {
  const [activeTab, setActiveTab] = useState<Tab>('reports');
  const [search, setSearch] = useState('');
  const [reportFilter, setReportFilter] = useState<ReportFilter>('tous');
  const [postFilter, setPostFilter] = useState<PostFilter>('tous');
  const [reportStatuses, setReportStatuses] = useState<Record<number, ReportStatus>>(
    Object.fromEntries(reports.map((r) => [r.id, r.status]))
  );
  const [postStatuses, setPostStatuses] = useState<Record<number, PostStatus>>(
    Object.fromEntries(posts.map((p) => [p.id, p.status]))
  );

  const filteredReports = reports.filter((r) => {
    const matchSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.content.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      reportFilter === 'tous' || reportStatuses[r.id] === reportFilter;
    return matchSearch && matchFilter;
  });

  const filteredPosts = posts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      postFilter === 'tous' || postStatuses[p.id] === postFilter;
    return matchSearch && matchFilter;
  });

  const updateReportStatus = (id: number, status: ReportStatus) => {
    setReportStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const updatePostStatus = (id: number, status: PostStatus) => {
    setPostStatuses((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Modération communauté</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gère les signalements et les posts de la communauté.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Signalements', value: reports.length, color: 'bg-red-50 text-red-400' },
          { label: 'En attente', value: Object.values(reportStatuses).filter((s) => s === 'En attente').length, color: 'bg-orange-50 text-orange-500' },
          { label: 'Posts totaux', value: posts.length, color: 'bg-teal-dark/10 text-teal-dark' },
          { label: 'Posts en attente', value: Object.values(postStatuses).filter((s) => s === 'En attente').length, color: 'bg-lime-bright/10 text-teal-dark' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-black ${stat.color.split(' ')[1]}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 w-fit gap-1">
        {([
          { id: 'reports', label: 'Signalements', icon: <Flag size={13} /> },
          { id: 'posts', label: 'Posts', icon: <MessageSquare size={13} /> },
        ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-teal-dark shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <Search size={15} className="text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none flex-1"
        />
      </div>

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Filter */}
          <div className="flex bg-slate-100 rounded-xl p-1 w-fit gap-1">
            {(['tous', 'En attente', 'Traité', 'Ignoré'] as ReportFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setReportFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  reportFilter === f
                    ? 'bg-white text-teal-dark shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f === 'tous' ? 'Tous' : f}
              </button>
            ))}
          </div>

          {/* Report Cards */}
          <div className="flex flex-col gap-3">
            {filteredReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full ${report.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                    {report.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-900">{report.user}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        report.priority === 'Urgent'
                          ? 'bg-red-50 text-red-400'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {report.priority}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {report.type}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-auto ${reportStatusColors[reportStatuses[report.id]]}`}>
                        {reportStatuses[report.id]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {report.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{report.time}</span>
                      {reportStatuses[report.id] === 'En attente' && (
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => updateReportStatus(report.id, 'Traité')}
                            className="flex items-center gap-1.5 text-xs font-bold text-teal-dark bg-teal-dark/10 px-3 py-1.5 rounded-lg hover:bg-teal-dark hover:text-white transition-all"
                          >
                            <CheckCircle size={12} />
                            Traiter
                          </button>
                          <button
                            onClick={() => updateReportStatus(report.id, 'Ignoré')}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-all"
                          >
                            <Eye size={12} />
                            Ignorer
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all">
                            <UserX size={12} />
                            Suspendre
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm font-semibold">
                Aucun signalement trouvé
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Filter */}
          <div className="flex bg-slate-100 rounded-xl p-1 w-fit gap-1">
            {(['tous', 'Approuvé', 'En attente', 'Supprimé'] as PostFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setPostFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  postFilter === f
                    ? 'bg-white text-teal-dark shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f === 'tous' ? 'Tous' : f}
              </button>
            ))}
          </div>

          {/* Post Cards */}
          <div className="flex flex-col gap-3">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full ${post.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                    {post.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-900">{post.name}</p>
                      {post.reports > 0 && (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-50 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={10} />
                          {post.reports} signalement(s)
                        </span>
                      )}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-auto ${postStatusColors[postStatuses[post.id]]}`}>
                        {postStatuses[post.id]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{post.time}</span>
                      <div className="flex gap-2 ml-auto">
                        {postStatuses[post.id] === 'En attente' && (
                          <button
                            onClick={() => updatePostStatus(post.id, 'Approuvé')}
                            className="flex items-center gap-1.5 text-xs font-bold text-teal-dark bg-teal-dark/10 px-3 py-1.5 rounded-lg hover:bg-teal-dark hover:text-white transition-all"
                          >
                            <CheckCircle size={12} />
                            Approuver
                          </button>
                        )}
                        <button
                          onClick={() => updatePostStatus(post.id, 'Approuvé')}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-all"
                        >
                          <Pin size={12} />
                          Épingler
                        </button>
                        <button
                          onClick={() => updatePostStatus(post.id, 'Supprimé')}
                          className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all"
                        >
                          <Trash2 size={12} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm font-semibold">
                Aucun post trouvé
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}