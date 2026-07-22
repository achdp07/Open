import { AnimatePresence, motion } from "framer-motion";
import { Users, X } from "lucide-react";

interface RegistrationClosedModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationClosedModal({
  open,
  onClose,
}: RegistrationClosedModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-dark/10">
                <Users className="h-8 w-8 text-teal-dark" />
              </div>

              <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
                Inscriptions clôturées
              </h2>

              <p className="mt-4 text-center leading-7 text-slate-600">
                Merci pour votre incroyable engouement !
                <br />
                Nous avons reçu bien plus de candidatures que de places
                disponibles. Le formulaire est désormais fermé afin de procéder
                à la sélection des participants.
              </p>

              <button
                onClick={onClose}
                className="mt-8 w-full rounded-full bg-teal-dark py-3 font-semibold text-white transition hover:opacity-90"
              >
                Compris
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}