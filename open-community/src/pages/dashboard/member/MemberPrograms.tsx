import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, BarChart, CheckCircle, Lock } from 'lucide-react';
import { programs } from '../../../data/programs';

const myEnrolledPrograms = [
  {
    id: 'digital-skills-bootcamp',
    progress: 42,
    status: 'in-progress',
    currentModule: 'Module 5 — JavaScript les bases',
    completedModules: 5,
    totalModules: 12,
  },
  {
    id: 'ai-for-everyone',
    progress: 0,
    status: 'upcoming',
    currentModule: 'Démarre le 1 Juin 2026',
    completedModules: 0,
    totalModules: 8,
  },
];

const modules = [
  { title: 'Introduction au web', done: true },
  { title: 'HTML fondamentaux', done: true },
  { title: 'CSS et mise en page', done: true },
  { title: 'Flexbox et Grid', done: true },
  { title: 'JavaScript les bases', done: true },
  { title: 'DOM et événements', done: false },
  { title: 'Fetch API et JSON', done: false },
  { title: 'Git et GitHub', done: false },
  { title: 'React introduction', done: false, locked: true },
  { title: 'React composants', done: false, locked: true },
  { title: 'Tailwind CSS', done: false, locked: true },
  { title: 'Projet final', done: false, locked: true },
];

export default function MemberPrograms() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mes programmes</h1>
        <p className="text-slate-500 text-sm mt-1">Suis ta progression et continue tes apprentissages.</p>
      </div>

      {/* Enrolled Programs */}
      <div className="grid md:grid-cols-2 gap-4">
        {myEnrolledPrograms.map((enrolled, idx) => {
          const program = programs.find((p) => p.id === enrolled.id);
          if (!program) return null;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6"
            >
              {/* Status */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  enrolled.status === 'in-progress'
                    ? 'bg-teal-dark/10 text-teal-dark'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {enrolled.status === 'in-progress' ? 'En cours' : 'À venir'}
                </span>
                <span className="text-xs text-slate-400 font-medium">{program.duration}</span>
              </div>

              {/* Info */}
              <h3 className="font-black text-slate-900 text-lg mb-1">{program.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{enrolled.currentModule}</p>

              {/* Meta */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={13} />
                  {program.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <BarChart size={13} />
                  {program.level}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle size={13} />
                  {enrolled.completedModules}/{enrolled.totalModules} modules
                </div>
              </div>

              {/* Progress */}
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Progression</span>
                <span className="font-bold text-teal-dark">{enrolled.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mb-5">
                <div
                  className="h-full bg-lime-bright rounded-full transition-all"
                  style={{ width: `${enrolled.progress}%` }}
                />
              </div>

              {/* CTA */}
              <Link
                to={`/programs/${enrolled.id}`}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all ${
                  enrolled.status === 'in-progress'
                    ? 'bg-teal-dark text-white hover:opacity-90'
                    : 'border-2 border-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {enrolled.status === 'in-progress' ? 'Continuer' : 'Bientôt disponible'}
                {enrolled.status === 'in-progress' && <ChevronRight size={16} />}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Module List for active program */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Modules — Digital Skills Bootcamp
          </h2>
          <span className="text-xs text-slate-400 font-medium">5/12 terminés</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 px-6 py-4 transition-all ${
                mod.locked ? 'opacity-40' : 'hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                mod.done
                  ? 'bg-lime-bright/20 text-lime-bright'
                  : mod.locked
                  ? 'bg-slate-100 text-slate-300'
                  : 'bg-teal-dark/10 text-teal-dark'
              }`}>
                {mod.done ? (
                  <CheckCircle size={14} />
                ) : mod.locked ? (
                  <Lock size={12} />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>
              <span className={`text-sm font-semibold flex-1 ${
                mod.done ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}>
                {mod.title}
              </span>
              {mod.locked && (
                <span className="text-xs bg-slate-100 text-slate-400 px-2 py-1 rounded-full font-semibold">
                  Pro
                </span>
              )}
              {!mod.done && !mod.locked && (
                <ChevronRight size={14} className="text-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explore more programs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Explorer d'autres programmes</h2>
          <Link to="/programs" className="text-xs text-teal-dark font-semibold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {programs
            .filter((p) => !myEnrolledPrograms.find((e) => e.id === p.id))
            .map((program, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500 mb-4 inline-block">
                  {program.tag}
                </span>
                <h3 className="font-bold text-slate-900 mb-2">{program.title}</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{program.desc}</p>
                <Link
                  to={`/programs/${program.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-slate-100 text-sm font-bold text-slate-700 hover:border-teal-dark hover:text-teal-dark transition-all"
                >
                  Voir le programme <ChevronRight size={14} />
                </Link>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}