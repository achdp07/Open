import { useState, useEffect } from 'react';
import { Calendar, Globe, Brain, Users, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
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

const getEventIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'workshop':  return <Brain size={28} />;
    case 'meetup':    return <Users size={28} />;
    case 'bootcamp':  return <Code size={28} />;
    default:          return <Globe size={28} />;
  }
};

const Events = () => {
  // ── Hooks en haut ──
  const [data, setData] = useState<EventsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [ setError] = useState('');
  const [error, setError] = useState('');
  const [loadingRsvp, setLoadingRsvp] = useState<number | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState<number | null>(null);

  // ── Appel API ──
  useEffect(() => {
    api.getEventsDashboard()
      .then(setData)
      .catch(() => setError('Erreur lors du chargement des événements'))
      .finally(() => setIsLoading(false));
  }, []);

  // ── RSVP Handler ──
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
      setRsvpSuccess(eventId);
      setTimeout(() => setRsvpSuccess(null), 3000);
    } catch {
      setError('Connecte-toi pour t\'inscrire à un événement');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingRsvp(null);
    }
  };

  // Filtre — seulement les événements à venir
  const upcomingEvents = data?.events
    .filter((e) => !e.is_past)
    .slice(0, 3) ?? [];

  return (
    <section id="events" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Evénements à venir
          </h2>
          <p className="text-slate-600">
            Ne manquez pas nos prochaines rencontres et sessions de formation.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-8 text-center">
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && (
          <>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-semibold">
                Aucun événement à venir pour le moment.
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 bg-teal-dark/20 text-teal-dark rounded-2xl flex items-center justify-center mb-6">
                      {getEventIcon(event.type)}
                    </div>

                    {/* Info */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {event.title}
                      </h3>
                      {event.is_registered && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-dark/10 text-teal-dark shrink-0 ml-2">
                          Inscrit ✓
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                      <Calendar size={14} />
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                      <Globe size={14} />
                      {event.location}
                    </div>

                    {/* Success message */}
                    {rsvpSuccess === event.id && (
                      <div className="bg-lime-bright/10 text-teal-dark text-xs font-bold px-3 py-2 rounded-xl mb-3 text-center">
                        Inscription confirmée ! 🎉
                      </div>
                    )}

                    {/* CTA */}
                    <button
                      onClick={() => handleRsvp(event.id)}
                      disabled={loadingRsvp === event.id}
                      className={`w-full py-3 rounded-xl border-2 font-bold text-sm transition-all disabled:opacity-50 ${
                        event.is_registered
                          ? 'border-teal-dark bg-teal-dark text-white hover:opacity-90'
                          : 'border-slate-100 text-slate-900 hover:border-teal-dark hover:text-teal-dark'
                      }`}
                    >
                      {loadingRsvp === event.id
                        ? 'Chargement...'
                        : event.is_registered
                        ? 'Se désinscrire'
                        : 'S\'inscrire'
                      }
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default Events;