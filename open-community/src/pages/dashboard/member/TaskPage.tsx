import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Presentation,
  Menu,
  X,
} from 'lucide-react';

export default function TaskPage() {
  const { programId, taskId } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);

  const program = {
    id: programId,
    title: 'Data Analytics Bootcamp',
    progress: 35,
    tasks: [
      {
        id: 1,
        title: 'Predictive Models',
        task_type: 'READING',
        completed: true,
      },
      {
        id: 2,
        title: 'Linear Regression',
        task_type: 'VIDEO',
        completed: true,
      },
      {
        id: 3,
        title: 'Feature Engineering',
        task_type: 'SLIDES',
        completed: false,
      },
      {
        id: 4,
        title: 'Model Evaluation',
        task_type: 'READING',
        completed: false,
      },
    ],
  };

  const currentTask =
    program.tasks.find((t) => t.id === Number(taskId)) ||
    program.tasks[0];

  const currentIndex = program.tasks.findIndex(
    (t) => t.id === Number(taskId)
  );

  const previousTask =
    currentIndex > 0
      ? program.tasks[currentIndex - 1]
      : null;

  const nextTask =
    currentIndex < program.tasks.length - 1
      ? program.tasks[currentIndex + 1]
      : null;

  const renderContent = () => {
    switch (currentTask.task_type) {
      case 'VIDEO':
        return (
          <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/watch?v=fAWHhLrQKQU&list=PL-dj3vZLnNhwbBXEbiSfz50XVXvesp1Hf"
              title="Video Lesson"
              allowFullScreen
            />
          </div>
        );

      case 'SLIDES':
        return (
          <div className="w-full h-[446px] rounded-3xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://docs.google.com/presentation/d/e/2PACX-1vTJ4yI18iXWL9yNK-SvZK44weJ7CI3Lr2jZ7KpGrkGpXjhmuf35k8Wq_fx-XHXWqmp3Eak8eOZSWRiX/pubembed?start=true&loop=false&delayms=60000" 
              title="Slides"
            />
          </div>
        );

      default:
        return (
          <article className="prose max-w-none">
            <h2>Introduction</h2>
            <p>
              Cette leçon présente les fondamentaux des
              modèles prédictifs et leur application dans
              l'analyse de données.
            </p>

            <h3>Pourquoi c'est important ?</h3>

            <p>
              Les modèles prédictifs permettent d'anticiper
              des comportements futurs à partir des données
              historiques.
            </p>
          </article>
        );
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <PlayCircle size={16} />;

      case 'SLIDES':
        return <Presentation size={16} />;

      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white border border-slate-200 rounded-3xl p-6">
        <div className="flex flex-col gap-4">

          <Link
            to={`/dashboard/member/programs/${programId}`}
            className="text-slate-500 hover:text-teal-dark inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={14} />
            Retour au programme
          </Link>

          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {currentTask.title}
              </h1>

              <p className="text-slate-500 mt-1">
                {program.title}
              </p>
            </div>

            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl"
            >
              <Menu size={18} />
              Parcours
            </button>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">
                Progression
              </span>

              <span className="text-teal-dark font-medium">
                {program.progress}%
              </span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-dark rounded-full"
                style={{ width: `${program.progress}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">

        <div className="bg-white border border-slate-200 rounded-3xl p-6">

          {renderContent()}

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Objectifs
            </h2>

            <div className="space-y-3">
              {[
                'Comprendre les concepts clés',
                'Appliquer les notions présentées',
                'Préparer la prochaine étape',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <CheckCircle2
                    size={18}
                    className="text-teal-dark"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Ressources
            </h2>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 border border-slate-200 rounded-xl hover:border-teal-dark hover:text-teal-dark">
                Slides PDF
              </button>

              <button className="px-4 py-2 border border-slate-200 rounded-xl hover:border-teal-dark hover:text-teal-dark">
                Dataset
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-12 flex-wrap gap-3">

            <div>
              {previousTask && (
                <Link
                  to={`/dashboard/member/programs/${programId}/tasks/${previousTask.id}`}
                  className="px-5 py-3 border border-slate-200 rounded-xl inline-flex items-center gap-2 hover:bg-slate-50"
                >
                  <ArrowLeft size={16} />
                  Précédent
                </Link>
              )}
            </div>

            <div className="flex gap-3">

              <button className="bg-teal-dark text-white px-5 py-3 rounded-xl font-medium">
                Marquer terminé
              </button>

              {nextTask && (
                <Link
                  to={`/dashboard/member/programs/${programId}/tasks/${nextTask.id}`}
                  className="px-5 py-3 border border-slate-200 rounded-xl inline-flex items-center gap-2 hover:bg-slate-50"
                >
                  Suivant
                  <ArrowRight size={16} />
                </Link>
              )}

            </div>

          </div>

        </div>

        <aside className="hidden lg:block bg-white border border-slate-200 rounded-3xl p-5 h-fit sticky top-24">
          <h3 className="font-semibold text-slate-900 mb-5">
            Parcours
          </h3>

          <div className="space-y-2">
            {program.tasks.map((task) => (
              <Link
                key={task.id}
                to={`/dashboard/member/programs/${programId}/tasks/${task.id}`}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  task.id === Number(taskId)
                    ? 'bg-teal-dark text-white'
                    : 'hover:bg-slate-50'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Circle size={18} />
                )}

                {getTaskIcon(task.task_type)}

                <span className="text-sm">
                  {task.title}
                </span>
              </Link>
            ))}
          </div>
        </aside>

      </div>

      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

          <div className="absolute right-0 top-0 h-full w-80 bg-white p-5">

            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">
                Parcours
              </h3>

              <button
                onClick={() => setShowSidebar(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {program.tasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/dashboard/member/programs/${programId}/tasks/${task.id}`}
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50"
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}

                  {getTaskIcon(task.task_type)}

                  <span>{task.title}</span>
                </Link>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
