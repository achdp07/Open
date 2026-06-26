import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Users,
    ArrowRight,
    Brain,
    GraduationCap,
    Sprout,
    Landmark,
    HeartPulse,
    Briefcase,
    ChevronDown,
  } from 'lucide-react';

export default function Hero () {
  return (
    <div>
        <section className="relative overflow-hidden pt-28 pb-24">

            {/* Background */}

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#9FC131]/10 rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#005C53]/10 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}

                        <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        >

                        <div className="inline-flex items-center gap-2 bg-[#005C53]/10 text-[#005C53] px-4 py-6 rounded-full text-sm font-bold mb-8">

                            INDABAX MAURITANIE 2026

                        </div>

                        <h1 className="text-2xl md:text-5xl font-black text-slate-900 leading-none mb-6">
                            Learn.
                            <br />
                            Build.
                            <br />
                            Innovate.
                        </h1>

                        <p className="text-2xl text-[#005C53] font-semibold mb-8">
                            L'Intelligence Artificielle au service de la Mauritanie.
                        </p>

                        <p className="text-slate-600 text-lg max-w-xl mb-10">
                            Rejoignez étudiants, chercheurs, entrepreneurs,
                            développeurs et professionnels pour explorer
                            ensemble l'avenir de l'IA en Mauritanie.
                        </p>

                        {/* Event infos */}

                        <div className="flex flex-wrap gap-4 mb-10">
                            <div className="flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-xl">
                                <Calendar size={18} />
                                À annoncer
                            </div>

                            <div className="flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-xl">
                                <MapPin size={18} />
                                Nouakchott
                            </div>

                            <div className="flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-xl">
                                <Users size={18} />
                                Places limitées
                            </div>
                        </div>

                        {/* CTA */}

                        <button
                            className="bg-[#005C53] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all"
                        >
                            S'inscrire maintenant
                            <ArrowRight />
                        </button>
                        </motion.div>

                        {/* RIGHT */}

                        <motion.div
                        initial={{ opacity: 0, scale: .8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        >

                        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10">
                            <img
                            src="/images/indaba-hero.svg"
                            alt="IndabaX"
                            className="w-full"
                            />
                        </div>
                        </motion.div>
                    
                    </div>
                </div>
            </section>
        </div>
  )
}