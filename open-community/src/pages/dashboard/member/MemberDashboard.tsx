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

// import { ArrowRight, Calendar, BookOpen, Users, Trophy } from "lucide-react";

// export default function MemberDashboard() {
//   return (
//     <div className="flex flex-col gap-8">

//       {/* Welcome */}
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">
//           Bonjour Abdellahi 👋
//         </h1>
//         <p className="text-slate-500 mt-2">
//           Continuez votre parcours numérique avec Open Community.
//         </p>
//       </div>

//       {/* Main CTA */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div>
//             <span className="inline-flex px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark text-sm font-medium mb-4">
//               Programme en cours
//             </span>

//             <h2 className="text-2xl font-bold text-slate-900 mb-2">
//               AI Foundations
//             </h2>

//             <p className="text-slate-500 mb-4">
//               Vous avez terminé 67% du parcours.
//             </p>

//             <div className="w-full max-w-md h-2 bg-slate-100 rounded-full">
//               <div
//                 className="h-2 bg-teal-dark rounded-full"
//                 style={{ width: "67%" }}
//               />
//             </div>
//           </div>

//           <button className="bg-teal-dark text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition">
//             Continuer
//             <ArrowRight size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Overview */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           {
//             label: "Programmes",
//             value: "2",
//             icon: BookOpen,
//           },
//           {
//             label: "Évènements",
//             value: "3",
//             icon: Calendar,
//           },
//           {
//             label: "Communauté",
//             value: "248",
//             icon: Users,
//           },
//           {
//             label: "Certificats",
//             value: "0",
//             icon: Trophy,
//           },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="bg-white border border-slate-200 rounded-2xl p-5"
//           >
//             <item.icon size={18} className="text-teal-dark mb-3" />
//             <p className="text-2xl font-bold text-slate-900">{item.value}</p>
//             <p className="text-sm text-slate-500">{item.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Programs + Events */}
//       <div className="grid lg:grid-cols-2 gap-6">

//         <div className="bg-white border border-slate-200 rounded-2xl p-6">
//           <h2 className="font-semibold text-slate-900 mb-5">
//             Mes programmes
//           </h2>

//           <div className="space-y-4">

//             {[
//               { name: "AI Foundations", progress: 67 },
//               { name: "Data Analytics", progress: 24 },
//             ].map((program) => (
//               <div
//                 key={program.name}
//                 className="border border-slate-200 rounded-xl p-4"
//               >
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium text-slate-900">
//                     {program.name}
//                   </span>
//                   <span className="text-teal-dark font-medium">
//                     {program.progress}%
//                   </span>
//                 </div>

//                 <div className="h-2 bg-slate-100 rounded-full mb-3">
//                   <div
//                     className="h-2 bg-teal-dark rounded-full"
//                     style={{ width: `${program.progress}%` }}
//                   />
//                 </div>

//                 <button className="text-sm text-teal-dark font-medium">
//                   Continuer
//                 </button>
//               </div>
//             ))}

//           </div>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-6">
//           <h2 className="font-semibold text-slate-900 mb-5">
//             Évènements à venir
//           </h2>

//           <div className="space-y-4">

//             {[
//               {
//                 title: "Workshop IA",
//                 date: "12 Juin 2026",
//               },
//               {
//                 title: "Bootcamp Data",
//                 date: "20 Juin 2026",
//               },
//               {
//                 title: "Community Meetup",
//                 date: "28 Juin 2026",
//               },
//             ].map((event) => (
//               <div
//                 key={event.title}
//                 className="border border-slate-200 rounded-xl p-4"
//               >
//                 <p className="font-medium text-slate-900">
//                   {event.title}
//                 </p>
//                 <p className="text-sm text-slate-500 mt-1">
//                   {event.date}
//                 </p>
//               </div>
//             ))}

//           </div>
//         </div>
//       </div>

//       {/* Activity */}
//       <div className="bg-white border border-slate-200 rounded-2xl p-6">
//         <h2 className="font-semibold text-slate-900 mb-5">
//           Activité récente
//         </h2>

//         <div className="space-y-4 text-sm">

//           <div className="text-slate-700">
//             ✓ Inscription au programme AI Foundations
//           </div>

//           <div className="text-slate-700">
//             ✓ Participation au Workshop IA
//           </div>

//           <div className="text-slate-700">
//             ✓ Mise à jour du profil
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
