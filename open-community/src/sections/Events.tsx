import { useState, useEffect } from 'react';
import { Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import RegistrationModal from '../components/RegistrationModal';
//import HandleRegistration from '../components/HandleRegistration';
//import HandleClosure from '../components/HandleClosure';
import RegistrationClosedModal from '../components/RegistrationClosedModal';

interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  location: string | null;
}

const Events = () => {
  const [showRegistrationClosed, setShowRegistrationClosed] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
   const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    api.getPublicEvents()
  
      .then((data) => {
        console.log('API events', data);
        setEvents(data);
      })
  
      .catch(() => {
        setError(
          'Erreur lors du chargement des événements'
        );
      })
  
      .finally(() => {
        setIsLoading(false);
      });
  
  }, []);

  const upcomingEvents = events.slice(0, 3);

  return (
    <section
      id="events"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">

            Événements à venir

          </h2>

          <p className="text-slate-600">

            Ne manquez pas nos prochains événements.

          </p>

        </div>

        {/* Loading */}

        {isLoading && (

          <div className="flex items-center justify-center h-40">

            <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />

          </div>

        )}

        {/* Error */}

        {!isLoading && error && (

          <div className="text-center text-red-500 font-semibold">

            {error}

          </div>

        )}

        {/* Events */}

        {!isLoading && !error && (

          <>
            {upcomingEvents.length === 0 ? (

              <div className="text-center py-12 text-slate-400 font-semibold">

                Aucun événement disponible.

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

                <div className="w-14 h-14 bg-teal-dark/20 text-teal-dark rounded-2xl flex items-center justify-center mb-6">

                  <Globe size={28} />

                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">

                  {event.title}

                </h3>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <Calendar size={14} />

                  {new Date(event.date).toLocaleDateString(
                    'fr-FR',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}

                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <Globe size={14} />
                  {event.location}
                </div>

                <button

                  onClick={() => setShowRegistrationClosed(true)}
                  //  onClick={() => {
                  //   setSelectedEvent(event);
                  //  }}

                  className="w-full py-3 rounded-xl bg-teal-dark text-white font-bold hover:opacity-90 transition"

                >

                  S'inscrire

                </button>

                           

                </motion.div>

                ))}

              </div>

            )}
          </>

        )}

        {/* Modal */}
         <RegistrationClosedModal
                  open={showRegistrationClosed}
                  onClose={() => setShowRegistrationClosed(false)}
                />  


      </div>

    </section>

    
  );
};

export default Events;