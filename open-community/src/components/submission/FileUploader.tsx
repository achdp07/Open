import { FileText, UploadCloud, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function FileUploader({
  label,
  file,
  onChange,
  accept = ".pdf",
  required = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selected: File | null) => {
    if (!selected) return;

    if (selected.size > MAX_SIZE) {
      alert("The project document must not exceed 10 MB.");
      return;
    }

    onChange(selected);
  };

  const formatSize = (size: number) =>
    size > 1024 * 1024
      ? `${(size / 1024 / 1024).toFixed(2)} MB`
      : `${(size / 1024).toFixed(0)} KB`;

  return (
    <div className="space-y-3">

      <label className="font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="
            w-full
            border-2
            border-dashed
            border-slate-300
            rounded-3xl
            p-10
            hover:border-teal-dark
            hover:bg-slate-50
            transition
          "
        >
          <UploadCloud
            size={42}
            className="mx-auto text-teal-dark mb-4"
          />

          <p className="font-semibold">
            Upload Project Document
          </p>

          <p className="text-sm text-slate-500 mt-2">
            PDF only • Max 10 MB
          </p>

        </button>
      ) : (
        <div className="flex justify-between items-center rounded-2xl border border-green-200 bg-green-50 p-5">

          <div className="flex gap-4 items-center">

            <FileText className="text-green-600" />

            <div>

              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-slate-500">
                {formatSize(file.size)}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
          >
            <X
              size={18}
              className="text-red-500"
            />
          </button>

        </div>
      )}

    </div>
  );
}