import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Camera, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const initialProfile = {
  firstName: 'Aminata',
  lastName: 'Mbaye',
  email: 'aminata.mbaye@email.com',
  phone: '+222 41 05 21 18',
  city: 'Nouakchott',
  country: 'Mauritanie',
  bio: 'Passionnée par le développement web et l\'innovation numérique. En formation chez Open! depuis 2026.',
  linkedin: 'linkedin.com/in/aminata-mbaye',
  twitter: '@aminata_dev',
  website: '',
  domain: 'Développement Web',
};

export default function MemberProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mon Profil</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gère tes informations personnelles et tes préférences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-teal-dark text-white text-2xl font-black flex items-center justify-center">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-lime-bright text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">{profile.domain}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-lime-bright/10 text-teal-dark">
              Plan Gratuit
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
              Membre depuis 2026
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 w-fit">
        {(['info', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-white text-teal-dark shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'info' ? 'Informations' : 'Sécurité'}
          </button>
        ))}
      </div>

      {/* Info Tab */}
      {activeTab === 'info' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Personal Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-slate-900 mb-6">
              Informations personnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">Prénom</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">Nom</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Mail size={12} /> Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Phone size={12} /> Téléphone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <MapPin size={12} /> Ville
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">Pays</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">Domaine</label>
                <select
                  value={profile.domain}
                  onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                >
                  <option>Développement Web</option>
                  <option>Intelligence Artificielle</option>
                  <option>Design UI/UX</option>
                  <option>Data Science</option>
                  <option>Entrepreneuriat</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-xs font-semibold text-slate-600">Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors resize-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white border border-slate-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Réseaux sociaux</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: 'LinkedIn', icon: <FaLinkedin size={14} />, key: 'linkedin', placeholder: 'linkedin.com/in/ton-profil' },
                { label: 'Twitter', icon: <FaTwitter size={14} />, key: 'twitter', placeholder: '@ton_pseudo' },
                { label: 'Site web', icon: <Globe size={14} />, key: 'website', placeholder: 'https://ton-site.com' },
              ].map((social) => (
                <div key={social.key} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    {social.icon} {social.label}
                  </label>
                  <input
                    type="text"
                    placeholder={social.placeholder}
                    value={profile[social.key as keyof typeof profile]}
                    onChange={(e) => setProfile({ ...profile, [social.key]: e.target.value })}
                    className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-teal-dark text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
            >
              {saved ? (
                <>
                  <CheckCircle size={16} />
                  Sauvegardé !
                </>
              ) : (
                'Sauvegarder les modifications'
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white border border-slate-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-slate-900 mb-6">
              Changer le mot de passe
            </h3>
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <button className="bg-teal-dark text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all w-fit">
                Mettre à jour
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white border border-red-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-red-500 mb-2">Zone dangereuse</h3>
            <p className="text-xs text-slate-500 mb-4">
              La suppression de ton compte est irréversible. Toutes tes données seront perdues.
            </p>
            <button className="border-2 border-red-200 text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
              Supprimer mon compte
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}