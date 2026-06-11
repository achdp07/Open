import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import { api } from '../../../services/api';

interface Program {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  level: string;
  language: string;
  duration_weeks: number;
  objectives: string[];
  is_enrolled: boolean;
  progress: number;
}

const getLevelLabel = (level: string) => {
  switch (level?.toUpperCase()) {
    case 'DEBUTANT':
      return 'Débutant';
    case 'INTERMEDIAIRE':
      return 'Intermédiaire';
    case 'AVANCE':
      return 'Avancé';
    case 'INNOVATION':
      return 'Innovation';
    default:
      return level;
  }
};

export default function MemberPrograms() {
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await api.getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Failed to load programs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const myPrograms = programs.filter((p) => p.is_enrolled);
  const otherPrograms = programs.filter((p) => !p.is_enrolled);

  const openProgram = (programId: number) => {
    navigate(`/dashboard/member/programs/${programId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Chargement...
      </div>
    );
  }
  console.log("Programs:", programs);

  programs.forEach((p) => {
    console.log({
      title: p.title,
      is_enrolled: p.is_enrolled,
      type: typeof p.is_enrolled,
    });
  });
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