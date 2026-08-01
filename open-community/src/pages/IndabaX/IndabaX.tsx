import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Brain,
  Network,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Wallet,
  Landmark,
  ChartColumn,
  Pickaxe,
  Zap,
} from 'lucide-react';

//import HandleClosure from '../../components/HandleClosure';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

//import RegistrationModal from '../../components/RegistrationModal';
//import SubmissionPage from '../../components/submission/SubmissionPage';
//import HandleRegistration from '../../components/HandleRegistration';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo from '../../assets/images/logo1.webp';

// import alx from '../../assets/images/alx.png';
// import unesco from '../../assets/images/unesco.png';
import tamkin from '../../assets/images/tamkin.webp';
import pafiid from '../../assets/images/pafiid.webp';
import mr from '../../assets/images/mr.webp';
import bcm from '../../assets/images/bcm.png';
import ane from '../../assets/images/ANE.png';

import indabaxLogo from '../../assets/images/indaba.webp';
import mihLogo from '../../assets/images/2mih.png';
import bann from '../../assets/images/bann.webp';




//import { api } from '../../services/api';

export default function IndabaXMauritania() {
  const navigate = useNavigate();
  //const [showSelectedEvent, setSelectedEvent] = useState(false);

  //const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  //const [success, setSuccess] = useState(false);

  const [opened, setOpened] = useState<number | null>(0);

  // For form validation errors (an object)
  //const [errors, setErrors] = useState<Record<string, string>>({});

  const dataThemes = [
  {
    title: "Accès au financement & Inclusion financière",
    icon: Wallet,
    description:
      "Explorer les données relatives à l'accès aux services financiers afin d'identifier les disparités et proposer des solutions favorisant une meilleure inclusion financière.",
    tags: [
      "Microfinance",
      "Crédits",
      "Banques",
      "Inclusion",
      "Épargne",
    ],
  },
  {
    title: "Crédits bancaires par secteur",
    icon: Landmark,
    description:
      "Analyser la répartition des crédits entre les différents secteurs économiques ainsi que leurs échéances.",
    tags: [
      "Agriculture",
      "Commerce",
      "Industrie",
      "Court terme",
      "Long terme",
    ],
  },
  {
    title: "Comptes nationaux & Macroéconomie",
    icon: ChartColumn,
    description:
      "Exploiter les principaux indicateurs économiques pour mieux comprendre la dynamique économique nationale.",
    tags: [
      "PIB",
      "Investissements",
      "Croissance",
      "Valeur ajoutée",
    ],
  },
  {
    title: "Production minière nationale",
    icon: Pickaxe,
    description:
      "Créer des analyses ou visualisations à partir des statistiques nationales sur la production minière.",
    tags: [
      "Fer",
      "Or",
      "Cuivre",
      "Tonnes",
      "Onces",
    ],
  },
  {
    title: "Démographie & Population",
    icon: Users,
    description:
      "Étudier la répartition de la population afin de produire des analyses territoriales et sociales.",
    tags: [
      "Population",
      "Régions",
      "Genre",
      "Âge",
      "Densité",
    ],
  },
  {
    title: "Énergie & Hydrocarbures",
    icon: Zap,
    description:
      "Analyser les statistiques de consommation énergétique pour imaginer des solutions innovantes.",
    tags: [
      "Gaz",
      "Pétrole",
      "Électricité",
      "Consommation",
    ],
  },
];




  const organizers = [
    {
      logo: logo,
      name: "Open Community",
      className: "h-8",
    },
    {
      logo: mihLogo,
      name: "2MIH",
      className: "h-8",
    },
    {
      logo: indabaxLogo,
      name: "IndabaX",
      className: "h-7",
    },
  ];

  const agenda = [
  {
    day: 'Intro',
    date: 'Vendredi 31 juillet',
    items: [
      {
        time: '08h30 – 09h00',
        title: 'Accueil des participants & enregistrement',
      },
      {
        time: '09h00 – 09h30',
        title: "Cérémonie officielle d'ouverture",
      },
      {
        time: '09h30 – 10h30',
        title: 'Présentation du Hackathon : objectifs, règlement et critères d’évaluation',
      },
      {
        time: '10h30 – 12h00',
        title: 'Présentation des jeux de données et des défis à relever',
      },
      {
        time: '12h00 – 13h30',
        title: 'Pause déjeuner & networking',
      },
      {
        time: '13h30 – 15h00',
        title: 'Présentation des livrables attendus et des outils mis à disposition',
      },
      {
        time: '15h00 – 16h00',
        title: 'Session Questions & Réponses',
      },
      {
        time: '16h00 – 17h00',
        title: 'Formation des équipes & préparation du hackathon',
      },
    ],
  },

  {
    day: 'Hack Day',
    date: 'Samedi 1 août',
    items: [
      {
        time: '08h30',
        title: 'Lancement officiel du hackathon',
      },
      {
        time: '08h30 – 13h00',
        title: 'Travail des équipes avec accompagnement des mentors et experts',
      },
      {
        time: '13h00 – 23h59',
        title: 'Développement des projets en autonomie',
      },
      {
        time: '23h59',
        title: 'Date limite de soumission des projets',
      },
    ],
  },

  {
    day: 'Pitch & Remise de Prix',
    date: 'Dimanche 2 août',
    items: [
      {
        time: '09h00 – 11h30',
        title: 'Pitch des équipes devant le jury',
      },
      {
        time: '11h30 – 12h30',
        title: 'Délibération du jury',
      },
      {
        time: '14h00 – 15h00',
        title: "Panel : IA, Open Data et innovation au service du développement",
      },
      {
        time: '15h00 – 16h00',
        title: 'Annonce des lauréats & remise des prix',
      },
      {
        time: '16h00',
        title: 'Clôture officielle & photo de famille',
      },
    ],
  },
];


//const [showRegistrationClosed, setShowRegistrationClosed] = useState(false);
const eventDate = new Date("2026-07-31T08:00:00");

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

useEffect(() => {
  window.scrollTo(0, 0);
  }, []);





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

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          

            {/* LEFT */}
            <motion.div
            className="relative lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <div className="flex flex-col gap-10">

 

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

                <h1 className="text-3xl font-bold mt-6 mb-6">
                  La Data au service de la Mauritanie
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Un événement dédié à l'apprentissage, l'innovation et la collaboration autour de la data et l'IA.
                </p>
                
                <Link
                  to="/indabax/submit"
                  //onClick={() => setShowRegistrationClosed(true)}
                  className="w-full md:w-auto bg-teal-dark text-white p-4 
                  rounded-2xl font-bold text-sm flex items-center justify-center 
                  gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Soumettre notre projet
                </Link>

                {/* <RegistrationModal
                  isOpen={showSelectedEvent}
                  onClose={() => setSelectedEvent(false)}
                  eventSlug="indabax-mr-2026"
                  eventTitle="IndabaX Mauritanie 2026"
                /> */}
                {/* <RegistrationClosedModal
                  open={showRegistrationClosed}
                  onClose={() => setShowRegistrationClosed(false)}
                /> */}
              </div>

              {/* Meta */}
              
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .6 }}
                  className="w-full mx-auto"
                >

                  <h2 className="text-3xl font-bold mb-6">
                    Les données qui alimenteront vos innovations
                  </h2>

                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Pendant le hackathon, les équipes auront accès à des
                    ensembles de données issus d'institutions nationales
                    afin de répondre à des problématiques concrètes.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                  {dataThemes.map((theme, index) => {
                    const Icon = theme.icon;

                    return (
                      <motion.div
                      key={theme.title}
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
                    transition-[transform,box-shadow] duration-300 ease-out
                    ">
                        <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
                          <Icon
                            size={28}
                            className="text-teal-dark"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">
                          {theme.title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                          {theme.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-6">
                          {theme.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-teal-50 text-teal-dark text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              {/* Organisateurs & Partenaires */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Organisateurs & partenaires
                </h2>

                {/* Organisateurs */}
                <div className="relative overflow-hidden py-2">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">
                  Organisateurs
                </p>

                <p className=" text-slate-600 mb-6 w-full leading-relaxed">
                  IndabaX Mauritanie 2026 est co-organisé par Open Community et
                  2MIH, avec le soutien de partenaires engagés pour le développement de l'IA, de
                  la Data et de l'innovation en Mauritanie.
                </p>
                  <motion.div
                    className="flex gap-12 w-full"
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
                        className="flex items-center justify-center shrink-0 px-10 mb-6"
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

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {[
{
                        logo: mr,
                        name: "mr",
                        className: "h-10",
                      },

                      {
                        logo: ane,
                        name: "ane",
                        className: "h-12",
                      },

                      {
                        logo: bcm,
                        name: "bcm",
                        className: "h-9",
                      },
                       {
                        logo: pafiid,
                        name: "pafiid",
                        className: "h-11",
                      },

                      {
                        logo: tamkin,
                        name: "tamkin",
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
                          className={`${partner.className} object-contain hover:grayscale-0 transition-all duration-300`}
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
                    transition-[transform,box-shadow] duration-300 ease-out
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

              {/* Ressources */}

              <div>

              <div className="max-w-2xl mb-10">
                <h2 className="text-3xl font-bold mb-4">
                  Ressources
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  Préparez votre participation en consultant les documents officiels
                  d'IndabaX Mauritanie et partagez l'événement avec votre réseau.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {[
                  {
                    icon: "📄",
                    title: "Règlement du Hackathon",
                    description: "Conditions de participation et règles officielles.",
                    action: "Consulter",
                    href: "",
                  },
                  // {
                  //   icon: "📘",
                  //   title: "Guide du participant",
                  //   description: "Toutes les informations pratiques pour les équipes.",
                  //   action: "Télécharger",
                  //   href: "",
                  // },
                  {
                    icon: "📅",
                    title: "Programme détaillé",
                    description: "Version PDF du programme complet.",
                    action: "Télécharger",
                    href: "",
                  },
                ].map((item, index) => (

                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="
                      border
                      border-slate-200
                      rounded-2xl
                      p-6
                      hover:shadow-xl
          
                      flex
                      flex-col
                      justify-between
                    "
                  >

                    <div>

                      <div className="text-3xl mb-4">
                        {item.icon}
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                    </div>

                    {item.href ? (

                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          font-semibold
                          text-teal-dark
                          hover:gap-3
                          transition-all
                        "
                      >
                        {item.action}
                        <ChevronRight size={16} />
                      </a>

                    ) : (

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Document bientôt disponible !");
                        }}
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          font-semibold
                          text-teal-dark
                          hover:gap-3
                          transition-all
                        "
                      >
                        {item.action}
                        <ChevronRight size={16} />
                      </button>

                    )}

                  </motion.div>

                ))}

              </div>

              </div>


            </div>
            </motion.div>

            {/* RIGHT */}

            <div className="lg:col-span-1">

              <div className="lg:sticky lg:top-28">
                
              </div>
                
            </div>

          </div>
          </div>
            
      </main>

      <Footer />
    </div>
  );
}
