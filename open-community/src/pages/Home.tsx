import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import WhySection from '../sections/WhySection';
import WhatWeDo from '../sections/WhatWeDo';
import Programs from '../sections/Programs';
import Impact from '../sections/Impact';
import Community from '../sections/Community';
import Events from '../sections/Events';
import Partners from '../sections/Partners';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-600">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <WhatWeDo />
        <Programs />
        <Impact />
        <Community />
        <Events />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}