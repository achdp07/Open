import { Brain, Code, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const activities = [
  { title: "FORMATIONS", subtitle: "IA / Data", icon: <Brain size={40} />, color: "bg-teal-dark" },
  { title: "WORKSHOPS", subtitle: "Bootcamps", icon: <Code size={40} />, color: "bg-lime-bright" },
  { title: "COMMUNAUTÉ", subtitle: "Networking", icon: <Users size={40} />, color: "bg-navy-deep" },
  { title: "EVENEMENTS", subtitle: "Hackathons", icon: <Calendar size={40} />, color: "bg-yellow-neon" }
];

const WhatWeDo = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ce que nous faisons
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Nous créons un écosystème complet pour l'apprentissage et l'innovation numérique.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {activities.map((act, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className={`${act.color} p-8 rounded-[2rem] text-white h-full flex flex-col justify-between shadow-lg transition-all group-hover:shadow-2xl`}>
                <div className="mb-12 opacity-80 group-hover:opacity-100 transition-opacity">
                  {act.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest opacity-80 mb-1">{act.title}</h3>
                  <p className="text-xl font-bold">{act.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;