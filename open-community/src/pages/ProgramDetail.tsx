import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Clock, BarChart, Globe, Users, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { programs } from '../data/programs';

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',  
    phone: '',
    city: '',
    motivation: '',
  });

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Programme introuvable</h1>
        <Link to="/programs" className="text-teal-dark font-semibold hover:underline">
          ← Voir tous les programmes
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-dark transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <div className="grid md:grid-cols-3 gap-12">

            {/* Left - Program Info */}
            <div className="md:col-span-2 flex flex-col gap-10">

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="px-3 py-1 bg-teal-dark/10 text-teal-dark rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                  {program.tag}
                </span>
                <h1 className="text-4xl font-black text-slate-900 mb-4">{program.title}</h1>
                <p className="text-lg text-slate-600 leading-relaxed">{program.desc}</p>
              </motion.div>

              {/* Meta cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Clock size={18} />, label: 'Durée', value: program.duration },
                  { icon: <BarChart size={18} />, label: 'Niveau', value: program.level },
                  { icon: <Globe size={18} />, label: 'Langue', value: program.language },
                  { icon: <Users size={18} />, label: 'Places', value: `${program.spots} places` },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-teal-dark mb-2">{item.icon}</div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Objectives */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Objectifs du programme</h2>
                <div className="flex flex-col gap-4">
                  {program.objectives.map((obj, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={20} className="text-lime-bright mt-0.5 shrink-0" />
                      <p className="text-slate-700">{obj}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Prérequis</h2>
                <div className="flex flex-col gap-4">
                  {program.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-dark mt-2 shrink-0"></div>
                      <p className="text-slate-700">{req}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right - Registration Form */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center gap-4 py-8"
                    >
                      <div className="w-16 h-16 bg-lime-bright/20 rounded-full flex items-center justify-center">
                        <CheckCircle size={32} className="text-lime-bright" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Candidature envoyée !</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Merci ! Nous reviendrons vers toi très bientôt sur ton email.
                      </p>
                      <Link
                        to="/programs"
                        className="text-teal-dark font-semibold text-sm hover:underline mt-2"
                      >
                        Voir les autres programmes
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">S'inscrire</h3>
                        <p className="text-sm text-slate-500">
                          Début le <span className="font-semibold text-teal-dark">{program.startDate}</span>
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600">Prénom</label>
                            <input
                              required
                              type="text"
                              placeholder="Prénom"
                              value={form.firstName}
                              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600">Nom</label>
                            <input
                              required
                              type="text"
                              placeholder="Nom"
                              value={form.lastName}
                              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">Email</label>
                          <input
                            required
                            type="email"
                            placeholder="ton@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">Téléphone</label>
                          <input
                            type="tel"
                            placeholder="+222 xx xx xx xx"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">Ville</label>
                          <input
                            required
                            type="text"
                            placeholder="Ta ville"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600">Motivation</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Pourquoi ce programme ?"
                            value={form.motivation}
                            onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                            className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-teal-dark text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-darker transition-all group mt-2"
                        >
                          Envoyer ma candidature
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
};

