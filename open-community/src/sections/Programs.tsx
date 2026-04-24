import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


const programs = [
  {
    title: "Digital Skills Bootcamp",
    tag: "Débutant",
    desc: "Maîtrisez les bases du développement web et du design digital."
  },
  {
    title: "AI For Everyone",
    tag: "Innovation",
    desc: "Comprendre et utiliser l'IA générative pour booster votre productivité."
  },
  {
    title: "Tech Career Launchpad",
    tag: "Carrière",
    desc: "Préparez-vous aux entretiens et construisez un portfolio percutant."
  },
  {
    title: "Innovation Lab",
    tag: "Projet",
    desc: "Transformez vos idées en prototypes réels avec l'aide de mentors."
  }
];

const Programs = () => {
  return (
    <section id="programs" className="py-24 bg-teal-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-lime-bright skew-x-12 -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos programmes</h2>
            <p className="text-slate-400 max-w-xl">
              Des parcours intensifs et pratiques pour transformer votre passion en expertise.
            </p>
          </div>
          <button className="text-slate-200 font-bold flex items-center gap-2 hover:text-white transition-colors group">
            Voir tous les programmes
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-white/20 text-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
                  {prog.tag}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{prog.title}</h3>
              <p className="text-slate-200 leading-relaxed">{prog.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programs;