import { Calendar, Globe, Brain, Users, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "AI Workshop",
    date: "25 Mars 2026",
    location: "Dakar, Sénégal / Online",
    icon: <Brain size={28} />
  },
  {
    title: "Tech Meetup",
    date: "12 Avril 2026",
    location: "Abidjan, CI",
    icon: <Users size={28} />
  },
  {
    title: "Bootcamp",
    date: "01 Mai 2026",
    location: "Lomé, Togo",
    icon: <Code size={28} />
  }
];

const Events = () => {
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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-14 h-14 bg-teal-dark/20 text-teal-dark rounded-2xl flex items-center justify-center mb-6">
                {event.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                <Calendar size={14} />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <Globe size={14} />
                {event.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;