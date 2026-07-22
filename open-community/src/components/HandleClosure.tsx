import { toast } from "react-hot-toast";
//import { CircleAlert } from "lucide-react";

export default function handleClosure() {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-[420px] max-w-[95vw] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl`}
      >
        <div className="flex items-start gap-4">
          {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-bright/15">
            <CircleAlert className="h-6 w-6 text-teal-dark" />
          </div> */}

          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              Inscriptions clôturées
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Merci pour votre incroyable engouement ! 
              Nous avons dépassé notre capacité d'accueil et le formulaire est désormais fermé.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-teal-dark">
                Merci pour votre intérêt et à bientôt pour nos prochains événements.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
        id: "registration-closed",
        position: "top-center",
        duration: 2500,
    }
  );


}