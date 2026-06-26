import React from 'react'

export default function Countdown () {
  return (
    <div>
        {/* COUNTDOWN */}

        <section className="py-16">

            <div className="max-w-5xl mx-auto px-6">

            <div className="bg-[#005C53] rounded-[2rem] p-12 text-center">

                <p className="text-white/70 uppercase tracking-widest mb-4">

                Début dans

                </p>

                <div className="grid grid-cols-4 gap-6">

                {['32', '16', '20', '50'].map((item) => (

                    <div key={item}>

                    <p className="text-5xl font-black text-white">

                        {item}

                    </p>

                    </div>

                ))}

                </div>

            </div>

            </div>

            </section>
    </div>
  )
}