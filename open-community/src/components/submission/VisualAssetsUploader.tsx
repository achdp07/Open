import {
  Image,
  Video,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useRef } from "react";

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
}

const MAX_SIZE = 50 * 1024 * 1024;

export default function VisualAssetsUploader({
  files,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (selected: FileList | null) => {
    if (!selected) return;

    const valid = Array.from(selected).filter((file) => {
      if (file.size > MAX_SIZE) {
        alert(`${file.name} dépasse la limite de 50 Mo.`);
        return false;
      }

      return true;
    });

    onChange([...files, ...valid]);
  };

  const remove = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">

      <label className="font-medium">
        Ressources visuelles
      </label>

      <input
        ref={inputRef}
        hidden
        multiple
        accept=".png,.jpg,.jpeg,.mp4"
        type="file"
        onChange={(e) => addFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          w-full
          border-2
          border-dashed
          border-slate-300
          rounded-3xl
          p-8
          hover:border-teal-dark
          hover:bg-slate-50
          transition
        "
      >
        <UploadCloud
          size={40}
          className="mx-auto text-teal-dark mb-4"
        />

        <p className="font-semibold">
          Téléchargez des images ou des vidéos
        </p>

        <p className="text-sm text-slate-500 mt-2">
          PNG • JPG • MP4 • Max 50 Mo par fichier
        </p>

      </button>

      {files.length > 0 && (

        <div className="space-y-3">

          {files.map((file, index) => {

            const isVideo = file.type.startsWith("video");

            return (
              <div
                key={index}
                className="flex justify-between items-center rounded-xl border border-slate-200 p-4"
              >

                <div className="flex items-center gap-3">

                  {isVideo ? (
                    <Video className="text-teal-dark" />
                  ) : (
                    <Image className="text-teal-dark" />
                  )}

                  <div>

                    <p className="font-medium">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} Mo
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </button>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}
