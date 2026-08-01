import type { SubmissionForm } from "./Type";

interface Props {
  form: SubmissionForm;
  setForm: React.Dispatch<React.SetStateAction<SubmissionForm>>;
}

export default function TeamStep({
  form,
  setForm,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <p className="text-sm font-semibold text-teal-dark">
          Étape 1 sur 3
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Informations de l'équipe
        </h2>

        <p className="text-slate-500 mt-2">
          Entrez le nom de votre équipe.
        </p>

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Nom de l'équipe *
        </label>

        <input
          value={form.team_name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              team_name: e.target.value,
            }))
          }
          placeholder="Data Ninjas"
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

      </div>

    </div>
  );
}
