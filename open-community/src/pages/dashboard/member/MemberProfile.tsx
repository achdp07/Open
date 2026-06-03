import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe, 
} from 'lucide-react';
// import {Linkedin, Twitter} from 'react-icons'
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function MemberProfile() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  // Local form state
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    bio: '',
    linkedin: '',
    twitter: '',
    website: '',
    domain: '',
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.getProfile();
      setProfile(data);
      setForm((prev) => ({
        ...prev,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
      }));
    } catch {
      setError('Erreur lors du chargement du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      await api.updateProfile({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = () => {
    setPasswordError('');
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordForm.new.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    // TODO: connect to password change endpoint when available
    setPasswordSaved(true);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = `${form.first_name?.[0] ?? ''}${form.last_name?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mon Profil</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gère tes informations personnelles et tes préférences.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-teal-dark text-white text-2xl font-black flex items-center justify-center">
            {initials || '?'}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-lime-bright text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {form.first_name} {form.last_name}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">{profile?.role}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-lime-bright/10 text-teal-dark">
              Plan Gratuit
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
              {profile?.email}
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

          {/* Personal Info — connected to API */}
          <div className="bg-white border border-slate-100 rounded-2xl p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900">
                Informations personnelles
              </h3>
              <span className="text-xs text-teal-dark font-semibold bg-teal-dark/10 px-3 py-1 rounded-full">
                Synchronisé avec le compte
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Prénom
                </label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Nom
                </label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Mail size={12} /> Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Phone size={12} /> Téléphone
                  <span className="text-slate-300 font-normal">(bientôt)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="+222 xx xx xx xx"
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <MapPin size={12} /> Ville
                  <span className="text-slate-300 font-normal">(bientôt)</span>
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  placeholder="Ta ville"
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Domaine
                  <span className="text-slate-300 font-normal ml-1">(bientôt)</span>
                </label>
                <select
                  value={form.domain}
                  onChange={(e) =>
                    setForm({ ...form, domain: e.target.value })
                  }
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                >
                  <option value="">Sélectionne un domaine</option>
                  <option>Développement Web</option>
                  <option>Intelligence Artificielle</option>
                  <option>Design UI/UX</option>
                  <option>Data Science</option>
                  <option>Entrepreneuriat</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-xs font-semibold text-slate-600">
                Bio
                <span className="text-slate-300 font-normal ml-1">(bientôt)</span>
              </label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Dis-nous en quelques mots qui tu es..."
                className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors resize-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white border border-slate-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Réseaux sociaux
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Ces champs seront connectés à l'API prochainement.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  label: 'LinkedIn',
                  // icon: <Linkedin size={14} />,
                  key: 'linkedin',
                  placeholder: 'linkedin.com/in/ton-profil',
                },
                {
                  label: 'Twitter',
                  // icon: <Twitter size={14} />,
                  key: 'twitter',
                  placeholder: '@ton_pseudo',
                },
                {
                  label: 'Site web',
                  icon: <Globe size={14} />,
                  key: 'website',
                  placeholder: 'https://ton-site.com',
                },
              ].map((social) => (
                <div key={social.key} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    {social.icon} {social.label}
                  </label>
                  <input
                    type="text"
                    placeholder={social.placeholder}
                    value={form[social.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [social.key]: e.target.value })
                    }
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
              disabled={isSaving}
              className="bg-teal-dark text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saved ? (
                <>
                  <CheckCircle size={16} />
                  Sauvegardé !
                </>
              ) : isSaving ? (
                'Sauvegarde...'
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

            {passwordError && (
              <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
                {passwordError}
              </div>
            )}

            {passwordSaved && (
              <div className="bg-lime-bright/10 text-teal-dark text-sm font-semibold px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                <CheckCircle size={15} />
                Mot de passe mis à jour !
              </div>
            )}

            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, current: e.target.value })
                  }
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
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
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
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirm: e.target.value })
                  }
                  className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                />
              </div>
              <button
                onClick={handlePasswordUpdate}
                className="bg-teal-dark text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all w-fit"
              >
                Mettre à jour
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white border border-red-100 rounded-2xl p-7">
            <h3 className="text-sm font-bold text-red-500 mb-2">
              Zone dangereuse
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              La déconnexion te redirigera vers la page de connexion.
            </p>
            <div className="flex gap-3">
              <button
                onClick={logout}
                className="border-2 border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Se déconnecter
              </button>
              <button className="border-2 border-red-200 text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
                Supprimer mon compte
              </button>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}