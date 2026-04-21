import { Globe, Cpu, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Globe className="text-teal-dark" size={32} />,
    title: "Fracture numérique",
    desc: "Réduire les inégalités d'accès aux outils et aux connaissances dans plusieurs communautés."
  },
  {
    icon: <Cpu className="text-lime-bright" size={32} />,
    title: "Manque de compétences",
    desc: "Combler le déficit de talents digitaux en formant aux technologies les plus demandées."
  },
  {
    icon: <Rocket className="text-navy-deep" size={32} />,
    title: "Accès aux opportunités",
    desc: "Ouvrir des portes vers des carrières tech et l'entrepreneuriat pour tous."
  }
];

const WhySection = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Pourquoi Open! ?
          </h2>
          <div className="w-20 h-1.5 bg-lime-bright mx-auto rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="mb-6 p-4 bg-slate-50 inline-block rounded-2xl">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhySection;