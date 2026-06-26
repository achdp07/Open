import { Link } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-lime-bright rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Rejoignez la communauté
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Développez vos compétences numériques avec Open! et faites partie
              de la nouvelle génération de leaders tech.
            </p>
            <Link
              to="/indabax"
              className="bg-white text-teal-dark px-12 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-2xl inline-block"
            >
               Participer à IndabaX
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;