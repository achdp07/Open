import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus,
  Users,
  Star,
  Clock,
  // BarChart,
  CheckCircle,
  Pencil,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { programs } from '../../../data/programs';

const myProgramIds = ['digital-skills-bootcamp', 'ai-for-everyone'];

const programStats = {
  'digital-skills-bootcamp': {
    learners: 28,
    total: 30,
    completion: 67,
    rating: 4.9,
    status: 'Actif',
    modules: 12,
    modulesReady: 10,
  },
  'ai-for-everyone': {
    learners: 45,
    total: 50,
    completion: 52,
    rating: 4.7,
    status: 'Actif',
    modules: 8,
    modulesReady: 8,
  },
};

const modules: Record<string, { title: string; duration: string; published: boolean }[]> = {
  'digital-skills-bootcamp': [
    { title: 'Introduction au web', duration: '45 min', published: true },
    { title: 'HTML fondamentaux', duration: '1h 20 min', published: true },
    { title: 'CSS et mise en page', duration: '1h 30 min', published: true },
    { title: 'Flexbox et Grid', duration: '1h 10 min', published: true },
    { title: 'JavaScript les bases', duration: '2h', published: true },
    { title: 'DOM et événements', duration: '1h 45 min', published: true },
    { title: 'Fetch API et JSON', duration: '1h 30 min', published: true },
    { title: 'Git et GitHub', duration: '1h', published: true },
    { title: 'React introduction', duration: '2h', published: true },
    { title: 'React composants', duration: '2h 30 min', published: true },
    { title: 'Tailwind CSS', duration: '1h 20 min', published: false },
    { title: 'Projet final', duration: '3h', published: false },
  ],
  'ai-for-everyone': [
    { title: 'Introduction à l\'IA', duration: '1h', published: true },
    { title: 'ChatGPT avancé', duration: '1h 30 min', published: true },
    { title: 'Claude et Gemini', duration: '1h 20 min', published: true },
    { title: 'Prompting avancé', duration: '2h', published: true },
    { title: 'IA pour la productivité', duration: '1h 45 min', published: true },
    { title: 'Automatisation avec l\'IA', duration: '2h', published: true },
    { title: 'IA pour le business', duration: '1h 30 min', published: true },
    { title: 'Projet final', duration: '2h', published: true },
  ],
};

export default function InstructorPrograms() {
  const [selectedProgram, setSelectedProgram] = useState(myProgramIds[0]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const myPrograms = programs.filter((p) => myProgramIds.includes(p.id));
  const currentProgram = programs.find((p) => p.id === selectedProgram);
  const currentStats = programStats[selectedProgram as keyof typeof programStats];
  const currentModules = modules[selectedProgram] || [];

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Mes programmes</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gère tes programmes et tes modules de cours.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
          <Plus size={15} />
          Nouveau programme
        </button>
      </div>

      {/* Program Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {myPrograms.map((prog, idx) => {
          const stats = programStats[prog.id as keyof typeof programStats];
          const isSelected = selectedProgram === prog.id;

          return (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => setSelectedProgram(prog.id)}
              className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                isSelected
                  ? 'border-teal-dark shadow-lg shadow-teal-dark/10'
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-lime-bright/10 text-teal-dark">
                  {stats.status}
                </span>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === prog.id ? null : prog.id);
                    }}
                    className="text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {openMenuId === prog.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-7 bg-white border border-slate-100 rounded-xl shadow-lg p-1 z-10 w-36"
                    >
                      <Link
                        to={`/programs/${prog.id}`}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Eye size={13} /> Voir
                      </Link>
                      <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg w-full">
                        <Pencil size={13} /> Modifier
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <h3 className="font-black text-slate-900 mb-3">{prog.title}</h3>

              <div className="flex gap-3 flex-wrap mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={13} />
                  {stats.learners}/{stats.total}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  {stats.rating}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={13} />
                  {prog.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle size={13} />
                  {stats.modulesReady}/{stats.modules} modules
                </div>
              </div>

              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Complétion moyenne</span>
                <span className="font-bold text-teal-dark">{stats.completion}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-full bg-lime-bright rounded-full"
                  style={{ width: `${stats.completion}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Module List */}
      {currentProgram && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Modules — {currentProgram.title}
            </h2>
            <button className="flex items-center gap-2 border-2 border-teal-dark text-teal-dark px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-dark hover:text-white transition-all">
              <Plus size={13} />
              Ajouter un module
            </button>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
            {currentModules.map((mod, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  mod.published
                    ? 'bg-lime-bright/20 text-teal-dark'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{mod.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{mod.duration}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  mod.published
                    ? 'bg-lime-bright/10 text-teal-dark'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {mod.published ? 'Publié' : 'Brouillon'}
                </span>
                <button className="text-slate-300 hover:text-teal-dark transition-colors">
                  <Pencil size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}