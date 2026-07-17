import { motion } from 'framer-motion';
import communityImg from '../assets/images/rej.webp';
import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div className="order-2 md:order-1 relative" 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}>
            <img
              src={communityImg}
              alt="Community Workshop"
              className="rounded-[2.5rem] shadow-2xl relative z-10 
              aspect-square object-cover w-full "
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-50 rounded-full -z-0"></div>
          </motion.div>

          {/* Text */}
          <motion.div className="order-1 md:order-2" 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
              La communauté Open!
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Open! rassemble étudiants, professionnels et créateurs autour du numérique,
              de l'innovation et du partage. Nous croyons que le futur se construit ensemble.
            </p>
            <Link 
            to="/indabax" 
            className="bg-[#005C53] text-white px-4 py-4 rounded-2xl font-bold hover:bg-[#004C43] 
            transition-all shadow-xl shadow-[#005C53]/20">
              Participer à IndabaX
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Community;