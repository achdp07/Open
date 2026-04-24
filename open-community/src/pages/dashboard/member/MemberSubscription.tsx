import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Zap, Crown } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    period: 'pour toujours',
    icon: <Zap size={20} />,
    color: 'border-slate-200',
    badge: null,
    features: [
      { text: 'Accès à 1 programme', included: true },
      { text: 'Communauté de base', included: true },
      { text: 'Événements publics', included: true },
      { text: 'Ressources limitées', included: true },
      { text: 'Certificats', included: false },
      { text: 'Sessions live avec instructeurs', included: false },
      { text: 'Programmes illimités', included: false },
      { text: 'Support prioritaire', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9900,
    period: 'par mois',
    icon: <Crown size={20} />,
    color: 'border-teal-dark',
    badge: 'Recommandé',
    features: [
      { text: 'Accès à 1 programme', included: true },
      { text: 'Communauté de base', included: true },
      { text: 'Événements publics', included: true },
      { text: 'Ressources illimitées', included: true },
      { text: 'Certificats', included: true },
      { text: 'Sessions live avec instructeurs', included: true },
      { text: 'Programmes illimités', included: true },
      { text: 'Support prioritaire', included: true },
    ],
  },
];

const currentPlan = 'free';

export default function MemberSubscription() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selected, setSelected] = useState(currentPlan);

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Abonnement</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gère ton plan et débloque toutes les fonctionnalités.
        </p>
      </div>

      {/* Current plan banner */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-dark/10 text-teal-dark rounded-2xl flex items-center justify-center">
            <Zap size={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Plan actuel
            </p>
            <p className="text-lg font-black text-slate-900">Plan Gratuit</p>
          </div>
        </div>
        <span className="text-xs font-bold px-4 py-2 rounded-full bg-slate-100 text-slate-500">
          Actif
        </span>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              billing === 'monthly'
                ? 'bg-white text-teal-dark shadow-sm'
                : 'text-slate-400'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              billing === 'yearly'
                ? 'bg-white text-teal-dark shadow-sm'
                : 'text-slate-400'
            }`}
          >
            Annuel
            <span className="ml-2 text-xs bg-lime-bright text-white px-2 py-0.5 rounded-full font-bold">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => {
          const price = billing === 'yearly'
            ? Math.round(plan.price * 0.8)
            : plan.price;
          const isCurrentPlan = plan.id === currentPlan;
          const isSelected = selected === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelected(plan.id)}
              className={`bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all relative ${
                isSelected
                  ? 'border-teal-dark shadow-lg shadow-teal-dark/10'
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-dark text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.id === 'pro'
                      ? 'bg-teal-dark text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.icon}
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{plan.name}</p>
                    {isCurrentPlan && (
                      <span className="text-xs text-teal-dark font-semibold">Plan actuel</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900">
                    {price === 0 ? 'Gratuit' : `${price.toLocaleString()} MRU`}
                  </p>
                  {price > 0 && (
                    <p className="text-xs text-slate-400">{plan.period}</p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    {feature.included ? (
                      <CheckCircle size={15} className="text-lime-bright shrink-0" />
                    ) : (
                      <Lock size={15} className="text-slate-300 shrink-0" />
                    )}
                    <span className={`text-sm ${
                      feature.included ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full mt-7 py-3 rounded-xl text-sm font-bold transition-all ${
                  isCurrentPlan
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.id === 'pro'
                    ? 'bg-teal-dark text-white hover:opacity-90'
                    : 'border-2 border-slate-200 text-slate-500'
                }`}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan
                  ? 'Plan actuel'
                  : plan.id === 'pro'
                  ? 'Passer au Pro'
                  : 'Choisir ce plan'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-white border border-slate-100 rounded-2xl p-7">
        <h2 className="text-base font-bold text-slate-900 mb-6">Questions fréquentes</h2>
        <div className="flex flex-col gap-5">
          {[
            {
              q: 'Puis-je annuler à tout moment ?',
              a: 'Oui, tu peux annuler ton abonnement Pro à tout moment. Tu gardes l\'accès jusqu\'à la fin de la période payée.',
            },
            {
              q: 'Comment fonctionne le plan annuel ?',
              a: 'Le plan annuel est facturé en une seule fois avec 20% de réduction par rapport au tarif mensuel.',
            },
            {
              q: 'Les certificats sont-ils reconnus ?',
              a: 'Nos certificats sont délivrés en partenariat avec nos partenaires institutionnels comme ALX et UNESCO.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-slate-50 pb-5 last:border-0 last:pb-0">
              <p className="text-sm font-bold text-slate-900 mb-2">{faq.q}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}