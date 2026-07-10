import alx from '../assets/images/alx.png';
import unesco from '../assets/images/unesco.png';
// import gdc from '../assets/images/gdc.png';
import mih from '../assets/images/2mih.png';
import indaba from '../assets/images/indaba.png';
import tamkin from '../assets/images/tamkin.png';

const Partners = () => {
  return (
    <section className="py-20 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          Ils nous font confiance
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale hover:grayscale-0 transition-all">
          <img src={unesco} className="h-12 object-contain" alt="UNESCO" />
          <img src={alx} className="h-12 object-contain" alt="ALX" />
          {/* <img src={gdc} className="h-6 object-contain" alt="GDC" /> */}
          <img src={mih} className="h-6 object-contain" alt="2mih" />
          <img src={indaba} className="h-6 object-contain" alt="indaba" />
          <img src={tamkin} className="h-6 object-contain" alt="tamkin" />

        </div>

      </div>
    </section>
  );
};

export default Partners;