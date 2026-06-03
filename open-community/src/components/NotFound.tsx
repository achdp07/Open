import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6"> 
        <div className="max-w-2xl mx-auto text-center">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            >
            <div className="text-[120px] md:text-[180px] font-black leading-none text-teal-dark/10">
                404
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Oups...
            </h1>

            <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                to="/"
                className="bg-teal-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                <Home size={18} />
                Retour à l'accueil
                </Link>

                <Link
                to="/programs"
                className="border-2 border-slate-200 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-teal-dark hover:text-teal-dark transition-all"
                >
                <ArrowLeft size={18} />
                Voir les programmes
                </Link>
            </div>
        </motion.div>
        </div>
    </div>
);
}
