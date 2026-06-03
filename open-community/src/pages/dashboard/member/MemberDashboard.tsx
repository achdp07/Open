import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
// import { useAuth } from '../../../context/AuthContext';

// Types qui correspondent à la réponse Django
interface DashboardData {
  user: { first_name: string; plan: string };
  stats: {
    overall_progress: number;
    modules_completed: number;
    total_modules: number;
    active_events: number;
    community_members: number;
  };
  my_programs: {
    id: number;
    status: string;
    title: string;
    progress: number;
    start_date: string;
  }[];
}

export default function MemberDashboard() {
  // const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getDashboard()
      .then(setData)
      .catch(() => setError('Erreur lors du chargement'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-semibold">
        {error || 'Données introuvables'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Bonjour, {data.user.first_name} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">Continue sur ta lancée !</p>
        </div>
        <span className="bg-lime-bright/15 text-teal-dark text-xs font-bold px-4 py-2 rounded-full">
          {data.user.plan}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Progression',
            value: `${data.stats.overall_progress}%`,
            sub: 'Globale',
          },
          {
            label: 'Modules terminés',
            value: `${data.stats.modules_completed}/${data.stats.total_modules}`,
            sub: 'Ce mois-ci',
          },
          {
            label: 'Événements',
            value: data.stats.active_events,
            sub: 'Inscriptions actives',
          },
          {
            label: 'Communauté',
            value: data.stats.community_members,
            sub: 'Membres actifs',
          },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* My Programs */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Mes programmes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.my_programs.map((prog) => (
            <div key={prog.id} className="bg-white border border-slate-100 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark">
                  {prog.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{prog.title}</h3>
              <p className="text-xs text-slate-500 mb-4">
                Début : {new Date(prog.start_date).toLocaleDateString('fr-FR')}
              </p>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Progression</span>
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