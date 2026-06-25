import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Brain,
  Network,
  Lightbulb,
  ChevronDown,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo from '../../assets/images/logo1.png';

import indabaxLogo from '../../assets/images/indaba.png';
import mihLogo from '../../assets/images/2mih.png';

import { api } from '../../services/api';

export default function IndabaXMauritania() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [opened, setOpened] = useState<number | null>(0);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    organization: '',
    motivation: '',
    source: '',
    accepted_terms: true,
  });

  const agenda = [
    {
      title: '08:30 - Accueil',
      description: 'Accueil des participants et installation.',
    },
    {
      title: '09:00 - Cérémonie d’ouverture',
      description: 'Présentation officielle de la journée.',
    },
    {
      title: '10:00 - Keynote IA',
      description: 'L’IA au service du développement de la Mauritanie.',
    },
    {
      title: '11:30 - Panels',
      description: 'Discussions avec les experts.',
    },
    {
      title: '13:00 - Pause déjeuner',
      description: 'Networking et échanges.',
    },
    {
      title: '14:00 - Workshops',
      description: 'Ateliers pratiques.',
    },
    {
      title: '16:00 - Networking',
      description: 'Rencontres et opportunités.',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.registerPublicEvent({
        event_slug: 'indabax-mr-2026',

        ...form,
      });

      setSuccess(true);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      <Navbar />

      <main className="pt-32 pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-dark mb-10"
          >
            <ArrowLeft size={16} />

            Retour

          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT */}

            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Logos */}

              <div className="flex flex-wrap items-center gap-8 pb-6 border-b border-slate-100">
                <img src={indabaxLogo} className="h-14"/>
                <img src={mihLogo} className="h-14"/>
                <img src={logo} className="h-12"/>
              </div>

              {/* Header */}
              <div>
                <span className="bg-teal-dark/10 text-teal-dark px-4 py-2 rounded-full text-sm font-bold">
                  IndabaX Mauritanie 2026
                </span>

                <h1 className="text-5xl text-slate-900 mt-6 mb-6">
                  L'intelligence artificielle au service de la Mauritanie
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Une journée dédiée à l'apprentissage, l'innovation et la collaboration autour de l'IA.
                </p>

              </div>

              {/* Meta */}

              <div className="grid md:grid-cols-3 gap-4">

                {[
                  {
                    icon: <Calendar size={18} />,
                    label: 'Date',
                    value: 'du 24 au 26 Juillet',
                  },

                  {
                    icon: <MapPin size={18} />,
                    label: 'Lieu',
                    value: 'Nouakchott',
                  },

                  {
                    icon: <Users size={18} />,
                    label: 'Places',
                    value: 'Limitées',
                  },
                ].map((item) => (

                  <div key={item.label} className="bg-slate-50 rounded-2xl p-5">
                    <div className="text-teal-dark mb-3">
                      {item.icon}
                    </div>

                    <p className="text-xs text-slate-400 uppercase">
                      {item.label}
                    </p>

                    <p className="font-bold">
                      {item.value}
                    </p>
                  </div>

                ))}

              </div>

              {/* Pourquoi */}

              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Pourquoi participer ?
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {[
                    {
                      icon: <Brain />,
                      title: 'Apprendre',
                    },

                    {
                      icon: <Users />,
                      title: 'Rencontrer',
                    },

                    {
                      icon: <Lightbulb />,
                      title: 'Construire',
                    },

                    {
                      icon: <Network />,
                      title: 'Opportunités',
                    },
                  ].map((item) => (

                    <div
                      key={item.title}
                      className="bg-slate-50 rounded-2xl p-6"
                    >

                      <div className="text-teal-dark mb-4">

                        {item.icon}

                      </div>

                      <h3 className="font-bold">

                        {item.title}

                      </h3>

                    </div>

                  ))}

                </div>

              </div>

              {/* Programme */}

              <div>

                <h2 className="text-3xl font-bold mb-8">

                  Programme

                </h2>

                <div className="space-y-4">

                  {agenda.map((item, idx) => (

                    <div
                      key={idx}
                      className="border border-slate-100 rounded-2xl overflow-hidden"
                    >

                      <button
                        onClick={() =>
                          setOpened(
                            opened === idx
                              ? null
                              : idx
                          )
                        }
                        className="w-full p-6 flex justify-between items-center"
                      >

                        <span className="font-bold">

                          {item.title}

                        </span>

                        <ChevronDown />

                      </button>

                      {opened === idx && (

                        <div className="px-6 pb-6 text-slate-500">

                          {item.description}

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="lg:col-span-1">

            <div className="lg:sticky lg:top-28">

              <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">

                {success ? (

                  <div className="flex flex-col items-center text-center gap-4 py-8">

                    <CheckCircle
                      size={36}
                      className="text-lime-bright"
                    />

                    <h3 className="text-2xl font-bold">

                      Inscription confirmée

                    </h3>

                    <p className="text-slate-500">

                      Merci pour votre inscription.

                    </p>

                  </div>

                ) : (

                  <>
                    <div className="mb-6">

                      <h3 className="text-xl font-bold text-slate-900 mb-1">

                        Réserver ma place

                      </h3>

                      <p className="text-sm text-slate-500">

                        Inscrivez-vous gratuitement.

                      </p>

                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >

                      {/* Nom */}

                      <div className="grid grid-cols-2 gap-3">

                        <div className="flex flex-col gap-1.5">

                          <label className="text-xs font-semibold text-slate-600">

                            Prénom

                          </label>

                          <input
                            required
                            name="first_name"
                            type="text"
                            placeholder="Prénom"
                            onChange={handleChange}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />

                        </div>

                        <div className="flex flex-col gap-1.5">

                          <label className="text-xs font-semibold text-slate-600">

                            Nom

                          </label>

                          <input
                            required
                            name="last_name"
                            type="text"
                            placeholder="Nom"
                            onChange={handleChange}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />

                        </div>

                      </div>

                      {/* Email */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Email

                        </label>

                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="ton@email.com"
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* WhatsApp */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          WhatsApp

                        </label>

                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="+222 xx xx xx xx"
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* Ville */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Ville

                        </label>

                        <input
                          required
                          name="city"
                          type="text"
                          placeholder="Nouakchott"
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* Profession */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Profession

                        </label>

                        <input
                          required
                          name="profession"
                          type="text"
                          placeholder="Étudiant, Ingénieur..."
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* Organisation */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Organisation

                        </label>

                        <input
                          name="organization"
                          type="text"
                          placeholder="Université, entreprise..."
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* Motivation */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Motivation

                        </label>

                        <textarea
                          required
                          name="motivation"
                          rows={3}
                          placeholder="Pourquoi souhaitez-vous participer ?"
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      {/* Source */}

                      <div className="flex flex-col gap-1.5">

                        <label className="text-xs font-semibold text-slate-600">

                          Comment avez-vous entendu parler de nous ?

                        </label>

                        <input
                          name="source"
                          type="text"
                          placeholder="Facebook, LinkedIn..."
                          onChange={handleChange}
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                        />

                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-teal-dark text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
                      >

                        {loading
                          ? 'Inscription...'
                          : 'Confirmer mon inscription'}

                        {!loading && (
                          <ChevronRight size={16} />
                        )}

                      </button>

                    </form>
                  </>
                )}

              </div>

            </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}




// import Navbar from '../../components/Navbar'
// import Hero from './Hero';
// import Countdown from './Countdown';

// import {
//   Calendar,
//   MapPin,
//   Users,
//   ArrowRight,
//   Brain,
//   GraduationCap,
//   Sprout,
//   Landmark,
//   HeartPulse,
//   Briefcase,
//   ChevronDown,
// } from 'lucide-react';

// import { motion } from 'framer-motion';

// export default function IndabaX() {

//   const tracks = [
//     {
//       title: 'Education',
//       icon: <GraduationCap />,
//       desc: 'L’IA au service de l’apprentissage.'
//     },
//     {
//       title: 'Santé',
//       icon: <HeartPulse />,
//       desc: 'Des solutions intelligentes pour la santé.'
//     },
//     {
//       title: 'Agriculture',
//       icon: <Sprout />,
//       desc: 'Accélérer l’innovation agricole.'
//     },
//     {
//       title: 'Gouvernance',
//       icon: <Landmark />,
//       desc: 'Des institutions plus efficaces.'
//     },
//     {
//       title: 'Entrepreneuriat',
//       icon: <Briefcase />,
//       desc: 'Créer des startups IA.'
//     },
//     {
//       title: 'Innovation',
//       icon: <Brain />,
//       desc: 'Imaginer le futur.'
//     },
//   ];

//   const agenda = [
//     'Accueil',
//     'Ouverture',
//     'Keynote IA',
//     'Panels',
//     'Workshops',
//     'Networking',
//     'Clôture',
//   ];

//   return (
//     <div className="bg-white min-h-screen">

//       <Navbar />
//       <Hero />
//       <Countdown />

     

      

//       {/* TRACKS */}

//       <section className="py-24 bg-slate-50">

//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center mb-16">

//             <h2 className="text-5xl font-bold">

//               AI Tracks

//             </h2>

//             <p className="text-slate-500 mt-4">

//               Les secteurs qui façonneront l'avenir.

//             </p>

//           </div>

//           <div className="grid md:grid-cols-3 gap-8">

//             {tracks.map((track) => (

//               <div
//                 key={track.title}
//                 className="bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all"
//               >

//                 <div className="w-14 h-14 bg-[#005C53]/10 rounded-2xl flex items-center justify-center text-[#005C53] mb-6">

//                   {track.icon}

//                 </div>

//                 <h3 className="text-2xl font-bold mb-4">

//                   {track.title}

//                 </h3>

//                 <p className="text-slate-500">

//                   {track.desc}

//                 </p>

//               </div>

//             ))}

//           </div>

//         </div>

//       </section>

//       {/* PROGRAMME */}

//       <section className="py-24">

//         <div className="max-w-4xl mx-auto px-6">

//           <div className="text-center mb-16">

//             <h2 className="text-5xl font-bold">

//               Programme

//             </h2>

//           </div>

//           <div className="space-y-4">

//             {agenda.map((item) => (

//               <div
//                 key={item}
//                 className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex justify-between"
//               >

//                 <span>{item}</span>

//                 <ChevronDown />

//               </div>

//             ))}

//           </div>

//         </div>

//       </section>

//       {/* PARTNERS */}

//       <section className="py-24 bg-slate-50">

//         <div className="max-w-6xl mx-auto px-6">

//           <h2 className="text-5xl font-bold text-center mb-16">

//             Partenaires

//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

//             <div className="h-24 border rounded-2xl" />
//             <div className="h-24 border rounded-2xl" />
//             <div className="h-24 border rounded-2xl" />
//             <div className="h-24 border rounded-2xl" />
//             <div className="h-24 border rounded-2xl" />

//           </div>

//         </div>

//       </section>

//       {/* CTA */}

//       <section className="py-24">

//         <div className="max-w-6xl mx-auto px-6">

//           <div className="bg-[#005C53] rounded-[3rem] p-20 text-center">

//             <h2 className="text-5xl font-bold text-white mb-6">

//               Réservez votre place

//             </h2>

//             <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">

//               Recevez toutes les informations directement par email.

//             </p>

//             <button className="bg-white text-[#005C53] px-10 py-5 rounded-2xl font-bold text-lg">

//               S'inscrire à IndabaX Mauritanie

//             </button>

//           </div>

//         </div>

//       </section>


//     </div>
//   );
// }