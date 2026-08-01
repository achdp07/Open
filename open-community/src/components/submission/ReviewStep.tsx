import type { Dispatch, SetStateAction } from "react";
import type { SubmissionForm } from "./Type";

import FileUploader from "./FileUploader";
import VisualAssetsUploader from "./VisualAssetsUploader";

interface Props {
  form: SubmissionForm;
  setForm: Dispatch<SetStateAction<SubmissionForm>>;
}

export default function ReviewStep({
  form,
  setForm,
}: Props) {
  return (
    <div className="space-y-10">

      <div>

        <p className="text-sm font-semibold text-teal-dark">
          Étape 3 sur 3
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Téléchargement et vérification
        </h2>

        <p className="text-slate-500 mt-2">
          Téléchargez les fichiers de votre projet et vérifiez votre soumission avant de l'envoyer.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Upload */}

        <div className="space-y-6">

          <FileUploader
            label="Document du projet"
            required
            accept=".pdf"
            file={form.project_document}
            onChange={(file) =>
              setForm((prev) => ({
                ...prev,
                project_document: file,
              }))
            }
          />

          <VisualAssetsUploader
            files={form.visual_assets}
            onChange={(files) =>
              setForm((prev) => ({
                ...prev,
                visual_assets: files,
              }))
            }
          />

        </div>

        {/* Summary */}

        <div className="bg-slate-50 rounded-3xl p-6 h-fit">

          <h3 className="font-semibold text-lg mb-6">
            Résumé de la soumission
          </h3>

          <Summary
            label="Nom de l'équipe"
            value={form.team_name || "-"}
          />

          <Summary
            label="Jeu de données utilisé"
            value={form.dataset_used || "-"}
          />

          <Summary
            label="Lien du projet"
            value={
              form.project_link || "Non fourni"
            }
          />

          <Summary
            label="Document du projet"
            value={
              form.project_document
                ? form.project_document.name
                : "Non téléchargé"
            }
          />

          <Summary
            label="Ressources visuelles"
            value={`${form.visual_assets.length} fichier(s)`}
          />

        </div>

      </div>

      {/* Confirmation */}

      <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">

        <p className="text-sm text-slate-600 leading-relaxed">
          En soumettant ce projet, vous confirmez que tous les fichiers appartiennent à votre
          équipe et que les informations fournies sont exactes.
        </p>

      </div>

    </div>
  );
}

function Summary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-5 last:mb-0">

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-900 break-all">
        {value}
      </p>

    </div>
  );
}
