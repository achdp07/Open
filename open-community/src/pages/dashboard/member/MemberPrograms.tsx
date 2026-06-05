import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import Programs from '../../../data/programs';

const getLevelLabel = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'beginner':
      return 'Débutant';
    case 'intermediate':
      return 'Intermédiaire';
    case 'advanced':
      return 'Avancé';
    default:
      return level;
  }
};

export default function MemberPrograms() {
  const navigate = useNavigate();

  const myPrograms = Programs.filter((p) => p.enrolled);
  const otherPrograms = Programs.filter((p) => !p.enrolled);

  const openProgram = (programId: number) => {
    navigate(`/dashboard/member/programs/${programId}`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Mes programmes
        </h1>

        <p className="text-slate-500 mt-2">
          Continuez votre parcours d'apprentissage.
        </p>
      </div>

      {/* En cours */}
      {myPrograms.length > 0 && (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">
            En cours
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {myPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white border border-slate-200 rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-dark/10 text-teal-dark flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {program.title}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {getLevelLabel(program.level)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-4">
                  {program.description}
                </p>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">
                    Progression
                  </span>

                  <span className="text-teal-dark font-medium">
                    {program.progress}%
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full mb-5">
                  <div
                    className="h-2 bg-teal-dark rounded-full"
                    style={{
                      width: `${program.progress}%`,
                    }}
                  />
                </div>

                <button
                  onClick={() => openProgram(program.id)}
                  className="w-full bg-teal-dark text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  Continuer
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explorer */}
      {otherPrograms.length > 0 && (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">
            Explorer
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {otherPrograms.map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ y: -2 }}
                className="bg-white border border-slate-200 rounded-3xl p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {program.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4">
                  {program.description}
                </p>

                <Link
                  to={`/dashboard/member/programs/${program.id}`}
                  className="text-teal-dark font-medium inline-flex items-center gap-2"
                >
                  Voir le programme
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}