import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Brain,
  Network,
  Lightbulb,
  ChevronDown,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import RegistrationModal from '../../components/RegistrationModal';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo from '../../assets/images/logo1.png';

import alx from '../../assets/images/alx.png';
import unesco from '../../assets/images/unesco.png';

import indabaxLogo from '../../assets/images/indaba.png';
import mihLogo from '../../assets/images/2mih.png';
import bann from '../../assets/images/bann.jpg';


import { api } from '../../services/api';

export default function IndabaXMauritania() {
  const navigate = useNavigate();
  const [showSelectedEvent, setSelectedEvent] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  const [opened, setOpened] = useState<number | null>(0);

  const [error, setError] = useState('');

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

  const organizers = [
    {
      logo: logo,
      name: "Open Community",
      className: "h-10",
    },
    {
      logo: mihLogo,
      name: "2MIH",
      className: "h-16",
    },
    {
      logo: indabaxLogo,
      name: "IndabaX",
      className: "h-14",
    },
  ];


  const agenda = [
    {
      day: 'Jour 1',
      date: 'Vendredi 24 juillet',
      items: [
        {
          time: '08h00 – 09h00',
          title: "Accueil & cérémonie d'ouverture",
        },
        {
          time: '09h00 – 10h00',
          title: 'Panel 1',
        },
        {
          time: '10h00 – 11h00',
          title: 'Panel 2',
        },
        {
          time: '11h00 – 12h00',
          title: 'Présentation du challenge, des jeux de données et des outils',
        },
        {
          time: '12h00 – 14h00',
          title: 'Visite des stands & networking',
        },
        {
          time: '14h00 – 16h00',
          title: 'Atelier mentorat #1 — Data Visualisation',
        },
        {
          time: '16h00 – 18h00',
          title: 'Atelier mentorat #2 — Storytelling & communication visuelle',
        },
      ],
    },
  
    {
      day: 'Jour 2',
      date: 'Samedi 25 juillet',
      items: [
        {
          time: '08h00 – 12h00',
          title: 'Travail en équipe : analyse et conception',
        },
        {
          time: '12h00 – 13h00',
          title: 'Pause déjeuner',
        },
        {
          time: '13h00 – 18h00',
          title: 'Finalisation des livrables & dépôt final',
        },
      ],
    },
  
    {
      day: 'Jour 3',
      date: 'Dimanche 26 juillet',
      items: [
        {
          time: '16h00 – 18h00',
          title: 'Pitch des équipes devant le jury + Questions',
        },
        {
          time: '18h00 – 19h00',
          title: 'Clôture & remise des prix',
        },
      ],
    },
  ];

const eventDate = new Date("2026-07-24T08:00:00");

const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(timer);
      return;
    }

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      ),
      minutes: Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      ),
      seconds: Math.floor(
        (distance % (1000 * 60)) /
          1000
      ),
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

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

    } catch (err: any) {
      setError(err.message);
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
            <motion.div
            className="relative lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <div className="flex flex-col gap-10">

              {/* Logos */}

              {/* <div className="flex flex-wrap items-center gap-8 pb-6 border-b border-slate-100">
                <img src={indabaxLogo} className="h-6"/>
                <img src={mihLogo} className="h-8"/>
                <img src={logo} className="h-8"/>
              </div> */}

 

              {/* Header */}
              <div>

              <div className="relative w-full min-h-[300px] md:min-h-[400px]  
               flex items-center justify-center p-4 rounded-2xl"
              style={{ backgroundImage: `url(${bann})` }}>
             
                {/* Overlay sombre pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/30 z-0 rounded-2xl"></div>

                {/* Contenu de la bannière */}
                <div className="relative z-10 text-center text-white max-w-2xl ">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">
                    IndabaX Mauritanie 2026
                  </h1>
                  <p className="text-base md:text-lg mb-6 text-gray-200">
                    Un événement unique pour propulser l'écosystème technologique mauritanien.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className=" rounded-3xl p-6 text-white"

                    // bg-gradient-to-r from-teal-dark to-[#00796B]
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-[0.25em] text-white">
                          Début dans
                        </h3>
                      </div>

                      <Calendar className="w-8 h-8 text-lime-bright" />
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {[
                        
                          { value: timeLeft.days, label: "Jours", short: "J" },
                          { value: timeLeft.hours, label: "Heures", short: "H" },
                          { value: timeLeft.minutes, label: "Minutes", short: "Min" },
                          { value: timeLeft.seconds, label: "Secondes", short: "Sec" },
                        
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          animate={{
                            scale: [1, 1.06, 1],
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="bg-white/10 backdrop-blur rounded-2xl py-4 text-center"
                        >
                          <p className="text-3xl font-black tabular-nums">
                            {String(item.value).padStart(2, "0")}
                          </p>

                          <p className="text-[10px] sm:text-xs uppercase text-white/70 mt-1">
                            <span className="sm:hidden">{item.short}</span>
                            <span className="hidden sm:inline">{item.label}</span>
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

                <h1 className="text-5xl text-slate-900 font-bold mt-6 mb-6">
                  La Data au service de la Mauritanie
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  Un événement dédié à l'apprentissage, l'innovation et la collaboration autour de la data et l'IA.
                </p>
                
                <button
                  onClick={() => setSelectedEvent(true)}
                  className="bg-teal-dark text-white p-4 rounded-full font-bold text-sm flex items-center 
                  justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
                >
                  Je réserve ma place
                </button>

                <RegistrationModal
                  isOpen={showSelectedEvent}
                  onClose={() => setSelectedEvent(false)}
                  eventSlug={showSelectedEvent?.eventSlug || ''}
                  eventTitle={showSelectedEvent?.eventTitle || ''}
                />
                  

              </div>

              {/* Meta */}

              <div className="divide-y divide-slate-200 border-y border-slate-200">

              {/* {[
                {
                  icon: <Calendar size={18} />,
                  label: 'Date',
                  value: '24 au 26 Juillet',
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
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15,
                  }}
                  className="flex items-center justify-between py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-teal-dark">
                      {item.icon}
                    </div>

                    <span className="text-slate-500 uppercase text-sm tracking-wide">
                      {item.label}
                    </span>
                  </div>

                  <span className="font-semibold text-slate-900">
                    {item.value}
                  </span>
                </motion.div>
              ))} */}

              </div>
              

              {/* Organisateurs & Partenaires */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Organisateurs & partenaires
                </h2>

                {/* Organisateurs */}
                <div className="relative overflow-hidden py-2">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                  Organisateurs
                </p>

                <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
                  IndabaX Mauritanie 2026 est co-organisé par Open Community et
                  2MIH, avec le soutien de partenaires engagés pour le développement de l'IA, de
                  la Data et de l'innovation en Mauritanie.
                </p>
                  <motion.div
                    className="flex gap-12 w-max"
                    animate={{
                      x: ["0%", "-50%"],
                    }}
                    transition={{
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    whileHover={{
                      animationPlayState: "paused",
                    }}
                  >
                    {[...organizers, ...organizers].map((partner, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center shrink-0 px-12 mb-6"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`${partner.className} object-contain`}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Partenaires */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                    Avec le soutien de
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                      {
                        logo: unesco,
                        name: "UNESCO",
                        className: "h-10",
                      },
                      {
                        logo: alx,
                        name: "ALX",
                        className: "h-10",
                      },
          
                    ].map((partner, idx) => (
                      <motion.div
                        key={partner.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{
                          scale: 1.03,
                        }}
                        viewport={{ once: true }}
                        className="
                          h-24
                          flex
                          items-center
                          justify-center
                          p-2
                        "
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`${partner.className} object-contain grayscale hover:grayscale-0 transition-all duration-300`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                      description: "Conférences, ateliers pratiques et retours d'expérience."
                    },

                    {
                      icon: <Users />,
                      title: 'Rencontrer',
                      description:"Échangez avec des experts, chercheurs, étudiants et professionnels du secteur."
                    },

                    {
                      icon: <Lightbulb />,
                      title: 'Construire',
                      description:
                      "Développez vos idées, collaborez sur des projets et relevez des défis concrets."
                    },

                    {
                      icon: <Network />,
                      title: 'Opportunités',
                      description: "Découvrez des stages, emplois, bourses et collaborations dans l'écosystème IA et Data."
                    },
                  ].map((item, index) => (
                    <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                    className="
                    group
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    p-6
                    hover:-translate-y-1
                    hover:shadow-xl
                    transition-all
                    "
                    >
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-dark flex items-center justify-center">
                        {item.icon}
                      </div>

                      <h3 className="font-bold text-lg mb-2">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                  </motion.div>
                  ))}

                </div>

              </div>
              

              {/* Programme */}

              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Programme
                </h2>

                <div className="space-y-4">
                  {agenda.map((day, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                    >
                      {/* Header */}
                      <button
                        onClick={() =>
                          setOpened(opened === idx ? null : idx)
                        }
                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <div className="text-left">
                          <p className="text-xs uppercase tracking-wider font-bold text-teal-dark">
                            {day.day}
                          </p>

                          <h3 className="text-lg font-bold text-slate-900 mt-1">
                            {day.date}
                          </h3>
                        </div>

                        <motion.div
                          animate={{
                            rotate: opened === idx ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                          }}
                        >
                          <ChevronDown className="text-slate-500" />
                        </motion.div>
                      </button>

                      {/* Content */}
                      <AnimatePresence initial={false}>
                        {opened === idx && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.35,
                              ease: 'easeInOut',
                            }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 px-6 py-6 space-y-6">
                              {day.items.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{
                                    opacity: 0,
                                    x: -10,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  transition={{
                                    delay: i * 0.05,
                                  }}
                                  className="flex gap-4"
                                >
                                  {/* Timeline */}
                                  <div className="flex flex-col items-center shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-teal-dark mt-1" />

                                    {i !== day.items.length - 1 && (
                                      <div className="w-px flex-1 bg-slate-200 mt-2" />
                                    )}
                                  </div>

                                  {/* Content */}
                                  <div className="pb-2">
                                    <p className="text-sm font-bold text-teal-dark">
                                      {item.time}
                                    </p>

                                    <p className="text-slate-600 leading-relaxed mt-1">
                                      {item.title}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            </motion.div>

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
                          className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none 
                          focus:border-teal-dark transition-colors"
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
                          className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.profession
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
                        />
                      {errors.profession && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.profession}
                        </p>
                      )}
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
