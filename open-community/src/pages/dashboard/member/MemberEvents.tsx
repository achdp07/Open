import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Brain, Users, Code, CheckCircle, Clock } from 'lucide-react';

const allEvents = [
  {
    id: 1,
    title: 'AI Workshop',
    date: '25 Mars 2026',
    time: '14h00 - 17h00',
    location: 'Dakar, Sénégal / Online',
    type: 'Workshop',
    icon: <Brain size={22} />,
    enrolled: true,
    past: false,
  },
  {
    id: 2,
    title: 'Tech Meetup',
    date: '12 Avril 2026',
    time: '10h00 - 13h00',
    location: 'Abidjan, CI',
    type: 'Meetup',
    icon: <Users size={22} />,
    enrolled: true,
    past: false,
  },
  {
    id: 3,
    title: 'Bootcamp Intensif',
    date: '01 Mai 2026',
    time: '09h00 - 18h00',
    location: 'Lomé, Togo',
    type: 'Bootcamp',
    icon: <Code size={22} />,
    enrolled: false,
    past: false,
  },
  {
    id: 4,
    title: 'Digital Skills Summit',
    date: '15 Juin 2026',
    time: '09h00 - 17h00',
    location: 'Nouakchott, Mauritanie',
    type: 'Conférence',
    icon: <Globe size={22} />,
    enrolled: false,
    past: false,
  },
  {
    id: 5,
    title: 'Hackathon Open!',
    date: '10 Février 2026',
    time: '08h00 - 20h00',
    location: 'Online',
    type: 'Hackathon',
    icon: <Code size={22} />,
    enrolled: true,
    past: true,
  },
];

type Filter = 'tous' | 'inscrits' | 'passes';

export default function MemberEvents() {
  const [filter, setFilter] = useState<Filter>('tous');
  const [enrolledIds, setEnrolledIds] = useState<number[]>([1, 2, 5]);

  const filtered = allEvents.filter((e) => {
    if (filter === 'inscrits') return enrolledIds.includes(e.id) && !e.past;
    if (filter === 'passes') return e.past;
    return !e.past;
  });

  const toggleEnroll = (id: number) => {
    setEnrolledIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Événements</h1>
        <p className="text-slate-500 text-sm mt-1">
          Rejoins nos prochaines rencontres et sessions de formation.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Inscriptions actives', value: enrolledIds.filter((id) => !allEvents.find((e) => e.id === id)?.past).length, icon: <CheckCircle size={16} />, color: 'bg-teal-dark/10 text-teal-dark' },
          { label: 'Événements à venir', value: allEvents.filter((e) => !e.past).length, icon: <Calendar size={16} />, color: 'bg-lime-bright/10 text-lime-bright' },
          { label: 'Événements passés', value: allEvents.filter((e) => e.past).length, icon: <Clock size={16} />, color: 'bg-slate-100 text-slate-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex bg-slate-100 rounded-xl p-1 w-fit gap-1">
        {(['tous', 'inscrits', 'passes'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              filter === f
                ? 'bg-white text-teal-dark shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {f === 'tous' ? 'Tous' : f === 'inscrits' ? 'Mes inscriptions' : 'Passés'}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((event, idx) => {
          const isEnrolled = enrolledIds.includes(event.id);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`bg-white border rounded-2xl p-6 ${
                event.past ? 'opacity-60 border-slate-100' : 'border-slate-100'
              }`}
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-teal-dark/10 text-teal-dark rounded-2xl flex items-center justify-center">
                  {event.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                    {event.type}
                  </span>
                  {isEnrolled && !event.past && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark">
                      Inscrit
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-slate-900 mb-3">{event.title}</h3>
              <div className="flex flex-col gap-1.5 mb-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={13} />
                  {event.date} — {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Globe size={13} />
                  {event.location}
                </div>
              </div>

              {/* CTA */}
              {!event.past && (
                <button
                  onClick={() => toggleEnroll(event.id)}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    isEnrolled
                      ? 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500'
                      : 'bg-teal-dark text-white hover:opacity-90'
                  }`}
                >
                  {isEnrolled ? 'Se désinscrire' : 'S\'inscrire'}
                </button>
              )}
              {event.past && (
                <div className="w-full py-3 rounded-xl text-sm font-bold text-center bg-slate-50 text-slate-400">
                  Événement terminé
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}