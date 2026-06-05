import { CheckCircle, Crown, Zap, GraduationCap, Users, Video, Trophy, LifeBuoy } from "lucide-react";

export default function MemberSubscription() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Abonnement</h1>
        <p className="text-slate-500 mt-2">
          Gérez votre abonnement et débloquez toutes les opportunités Open.
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Plan actuel</p>
            <h2 className="text-2xl font-bold text-slate-900">Gratuit</h2>
          </div>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            Actif
          </span>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-3">
          {["Communauté", "Évènements", "1 Programme"].map((item) => (
            <div
              key={item}
              className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700"
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Pourquoi passer Pro ?
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: GraduationCap, text: "Obtenir des certificats" },
            { icon: Video, text: "Participer aux sessions live" },
            { icon: Users, text: "Développer son réseau" },
            { icon: Trophy, text: "Accéder aux opportunités exclusives" },
            { icon: LifeBuoy, text: "Support prioritaire" },
            { icon: CheckCircle, text: "Accès à tous les programmes" },
          ].map((benefit) => (
            <div
              key={benefit.text}
              className="flex items-center gap-3 border border-slate-200 rounded-xl p-4"
            >
              <benefit.icon size={18} className="text-green-500" />
              <span className="text-slate-700">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Choisissez votre plan
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-slate-500" size={20} />
              <h3 className="font-semibold text-slate-900">Gratuit</h3>
            </div>

            <p className="text-slate-500 mb-6">
              Pour découvrir Open Community.
            </p>

            <div className="space-y-3 mb-6">
              <p>✓ Communauté</p>
              <p>✓ Évènements</p>
              <p>✓ 1 programme</p>
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-500 font-medium"
            >
              Plan actuel
            </button>
          </div>

          <div className="bg-white border-2 border-green-500 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
              Recommandé
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Crown className="text-green-500" size={20} />
              <h3 className="font-semibold text-slate-900">Pro</h3>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">
                9 900 MRU
              </span>
              <span className="text-slate-500"> / mois</span>
            </div>

            <div className="space-y-3 mb-6">
              <p>✓ Tout le plan Gratuit</p>
              <p>✓ Certificats</p>
              <p>✓ Programmes illimités</p>
              <p>✓ Sessions live</p>
              <p>✓ Support prioritaire</p>
            </div>

            <button className="w-full py-3 rounded-xl bg-green-500 text-white font-medium hover:opacity-90 transition">
              Passer au Pro
            </button>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Historique
        </h2>

        <div className="text-slate-500 text-sm">
          Aucun paiement enregistré.
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Questions fréquentes
        </h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-medium text-slate-900">
              Puis-je annuler à tout moment ?
            </h3>
            <p className="text-slate-500 mt-1">
              Oui, votre abonnement peut être annulé à tout moment.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-slate-900">
              Comment se passe la facturation ?
            </h3>
            <p className="text-slate-500 mt-1">
              La facturation est mensuelle et renouvelée automatiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
