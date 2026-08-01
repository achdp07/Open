import type { Dispatch, SetStateAction } from "react";
import type { SubmissionForm } from "./Type";
import { DATASETS } from "./Constants";

interface Props {
  form: SubmissionForm;
  setForm: Dispatch<SetStateAction<SubmissionForm>>;
  errors: Record<string, string>;
}

export default function ProjectStep({
  form,
  setForm,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <p className="text-sm font-semibold text-teal-dark">
          Étape 2 sur 3
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Projet
        </h2>

        <p className="text-slate-500 mt-2">
          Sélectionnez le jeu de données utilisé pour votre projet et partagez éventuellement un lien vers le projet.
        </p>

      </div>

      {/* Dataset */}

      <div>

        <label className="block mb-2 font-medium">
          Jeu de données utilisé *
        </label>

        <select
          value={form.dataset_used}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              dataset_used: e.target.value,
            }))
          }
          className="
            w-full
            border-2
            border-slate-200
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:border-teal-dark
          "
        >
          <option value="">
            Sélectionnez un jeu de données
          </option>

          {DATASETS.map((dataset) => (
            <option
              key={dataset.value}
              value={dataset.value}
            >
              {dataset.label}
            </option>
          ))}

        </select>

      </div>

      {/* Project Link */}

      <div>

        <label className="block mb-2 font-medium">
          Lien du projet
        </label>

        <input
          type="url"
          placeholder="https://github.com/..."
          value={form.project_link}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              project_link: e.target.value,
            }))
          }
          className="
            w-full
            border-2
            border-slate-200
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:border-teal-dark
          "
        />

        <p className="text-sm text-slate-500 mt-2">
          Optionnel. GitHub, Figma, Notion ou tout autre lien de projet public.
        </p>

      </div>

    </div>
  );
}
