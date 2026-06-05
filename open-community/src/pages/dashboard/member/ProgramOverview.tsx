import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
} from "lucide-react";

export default function ProgramOverview() {
  const { programId } = useParams();

  // TODO: remplacer par GET /api/courses/programs/:id
  const program = {
    id: programId,
    title: "Data Analytics Bootcamp",
    description:
      "Apprenez les fondamentaux de l'analyse de données, des statistiques et du machine learning.",
    progress: 35,
    tasks: [
      {
        id: 1,
        title: "Predictive Models",
        task_type: "READING",
        completed: true,
      },
      {
        id: 2,
        title: "Linear Regression",
        task_type: "VIDEO",
        completed: true,
      },
      {
        id: 3,
        title: "Feature Engineering",
        task_type: "SLIDES",
        completed: true,
      },
      {
        id: 4,
        title: "Model Evaluation",
        task_type: "READING",
        completed: true,
      },
    ],
  };

  const nextTask =
    program.tasks.find((task) => !task.completed) ||
    program.tasks[0];

  const completedTasks = program.tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-dark/10 text-teal-dark text-sm font-medium mb-4">
              <BookOpen size={14} />
              Programme
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              {program.title}
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl">
              {program.description}
            </p>
          </div>

          <Link
            to={`/dashboard/member/programs/${programId}/tasks/${nextTask.id}`}
            className="inline-flex items-center justify-center gap-2 bg-teal-dark text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Continuer
            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="mt-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-slate-600">
              Progression
            </span>
            <span className="font-medium text-teal-dark">
              {program.progress}%
            </span>
          </div>

          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-dark rounded-full"
              style={{
                width: `${program.progress}%`,
              }}
            />
          </div>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-2xl font-bold text-slate-900">
            {program.tasks.length}
          </p>
          <p className="text-sm text-slate-500">
            Tâches
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-2xl font-bold text-slate-900">
            {completedTasks}
          </p>
          <p className="text-sm text-slate-500">
            Terminées
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-2xl font-bold text-slate-900">
            {program.tasks.length - completedTasks}
          </p>
          <p className="text-sm text-slate-500">
            Restantes
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-2xl font-bold text-teal-dark">
            {program.progress}%
          </p>
          <p className="text-sm text-slate-500">
            Progression
          </p>
        </div>

      </div>

      {/* Tasks */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">
            Parcours d'apprentissage
          </h2>
        </div>

        <div className="divide-y divide-slate-200">

          {program.tasks.map((task, index) => (
            <Link
              key={task.id}
              to={`/dashboard/member/programs/${programId}/tasks/${task.id}`}
              className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-4">

                {task.completed ? (
                  <CheckCircle2
                    size={20}
                    className="text-teal-dark"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="text-slate-300"
                  />
                )}

                <div>
                  <p className="font-medium text-slate-900">
                    {index + 1}. {task.title}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {task.task_type}
                  </p>
                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-400"
              />
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}
