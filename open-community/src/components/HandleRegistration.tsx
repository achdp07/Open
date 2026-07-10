import { toast } from "react-hot-toast";

export default function handleRegistration() {
toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md bg-white border border-teal-dark rounded-2xl shadow-xl px-5 py-4`}
    >
      <h3 className="font-bold text-teal-dark mb-1">
        Inscriptions bientôt ouvertes
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed">
        Nous finalisons les derniers détails. Les inscriptions ouvriront très prochainement. Restez connectés !
      </p>
    </div>
  ));
}