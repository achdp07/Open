import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"



export default function SuccessStep() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: .9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: .3,
      }}
      className="px-10 py-20 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">

        <CheckCircle2
          size={54}
          className="text-green-600"
        />

      </div>

      <h2 className="text-3xl font-bold text-slate-900 mt-8">
        Projet soumis !
      </h2>

      <p className="text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
        Merci pour votre participation à
        <span className="font-semibold text-slate-700">
          {" "}IndabaX Mauritania 2026
        </span>.
        <br />
        Votre projet a bien été reçu et sera examiné par notre jury.
      </p>

      <div className="mt-10 bg-slate-50 rounded-2xl p-5 inline-block">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          Statut de la soumission
        </p>

        <p className="text-green-600 font-semibold mt-1">
          Reçu avec succès
        </p>

      </div>

      <Link
        to="Indabax/submit"
        className="mt-10 bg-teal-dark text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Fermer
      </Link>

    </motion.div>
  );
}
