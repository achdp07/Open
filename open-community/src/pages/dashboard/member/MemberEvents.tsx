import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Brain, Users, Code, CheckCircle, Clock } from 'lucide-react';
import { api } from '../../../services/api';

interface Event {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  event_type: string;
  is_registered: boolean;
  is_past: boolean;
  meeting_link: string | null;
}

interface EventsData {
  stats: {
    active_registrations: number;
    upcoming_events: number;
    past_events: number;
  };
  events: Event[];
}

type Filter = 'tous' | 'inscrits' | 'passes';

// Icônes générées côté frontend
const getEventIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'workshop':  return <Brain size={22} />;
    case 'meetup':    return <Users size={22} />;
    case 'bootcamp':  return <Code size={22} />;
    default:          return <Globe size={22} />;
  }
};

export default function MemberEvents() {

  // ── Tous les hooks en haut ──
  const [data, setData] = useState<EventsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('tous');
  const [loadingRsvp, setLoadingRsvp] = useState<number | null>(null);

  // ── Appel API ──
  useEffect(() => {
    api.getEventsDashboard()
      .then(setData)
      .catch(() => setError('Erreur lors du chargement des événements'))
      .finally(() => setIsLoading(false));
  }, []);

  // ── Handler RSVP ──
  const handleRsvp = async (eventId: number) => {
    setLoadingRsvp(eventId);
    try {
      await api.rsvpEvent(eventId);
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          events: prev.events.map((e) =>
            e.id === eventId
              ? { ...e, is_registered: !e.is_registered }
              : e
          ),
        };
      });
    } catch {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoadingRsvp(null);
    }
  };

  // ── Les 3 états ──
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

  // ── Filtre ──
  const filtered = data.events.filter((e) => {
    if (filter === 'inscrits') return e.is_registered && !e.is_past;
    if (filter === 'passes') return e.is_past;
    return !e.is_past;
  });

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
          { label: 'Inscriptions actives', value: data.stats.active_registrations, icon: <CheckCircle size={16} />, color: 'bg-teal-dark/10 text-teal-dark' },
          { label: 'Événements à venir', value: data.stats.upcoming_events, icon: <Calendar size={16} />, color: 'bg-lime-bright/10 text-lime-bright' },
          { label: 'Événements passés', value: data.stats.past_events, icon: <Clock size={16} />, color: 'bg-slate-100 text-slate-500' },
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
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
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
        {filtered.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`bg-white border rounded-2xl p-6 ${
              event.is_past ? 'opacity-60 border-slate-100' : 'border-slate-100'
            }`}
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-teal-dark/10 text-teal-dark rounded-2xl flex items-center justify-center">
                {getEventIcon(event.event_type)}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                  {event.event_type}
                </span>
                {event.is_registered && !event.is_past && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark">
                    Inscrit ✓
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-bold text-slate-900 mb-3">{event.title}</h3>
            <div className="flex flex-col gap-1.5 mb-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={13} />
                {new Date(event.start_time).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Globe size={13} />
                {event.location}
              </div>
            </div>

            {/* CTA */}
            {!event.is_past && (
              <button
                onClick={() => handleRsvp(event.id)}
                disabled={loadingRsvp === event.id}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 ${
                  event.is_registered
                    ? 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500'
                    : 'bg-teal-dark text-white hover:opacity-90'
                }`}
              >
                {loadingRsvp === event.id
                  ? 'Chargement...'
                  : event.is_registered
                  ? 'Se désinscrire'
                  : 'S\'inscrire'
                }
              </button>
            )}
            {event.is_past && (
              <div className="w-full py-3 rounded-xl text-sm font-bold text-center bg-slate-50 text-slate-400">
                Événement terminé
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
}