import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Bell,
  Shield,
  CreditCard,
  Mail,
  CheckCircle,
  Save,
} from 'lucide-react';

type Tab = 'general' | 'notifications' | 'security' | 'billing' | 'email';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'Général', icon: <Globe size={15} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
  { id: 'security', label: 'Sécurité', icon: <Shield size={15} /> },
  { id: 'billing', label: 'Facturation', icon: <CreditCard size={15} /> },
  { id: 'email', label: 'Emails', icon: <Mail size={15} /> },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    siteName: 'Open Community',
    siteUrl: 'https://opencommunity.mr',
    supportEmail: 'openmr.contact@gmail.com',
    phone: '+222 41 05 21 18',
    address: 'Nouakchott, Mauritanie',
    language: 'Français',
    currency: 'MRU',
  });

  const [notifications, setNotifications] = useState({
    newMember: true,
    newEnrollment: true,
    newPayment: true,
    communityReport: true,
    weeklyReport: false,
    monthlyReport: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Paramètres</h1>
        <p className="text-slate-500 text-sm mt-1">
          Configurer la plateforme Open!
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {/* Sidebar tabs */}
        <div className="md:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-2 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-teal-dark text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >

            {/* General */}
            {activeTab === 'general' && (
              <div className="bg-white border border-slate-100 rounded-2xl p-7">
                <h2 className="text-base font-bold text-slate-900 mb-6">
                  Informations générales
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: 'Nom du site', key: 'siteName', type: 'text' },
                    { label: 'URL du site', key: 'siteUrl', type: 'text' },
                    { label: 'Email support', key: 'supportEmail', type: 'email' },
                    { label: 'Téléphone', key: 'phone', type: 'tel' },
                    { label: 'Adresse', key: 'address', type: 'text' },
                    { label: 'Devise', key: 'currency', type: 'text' },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-600">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={general[field.key as keyof typeof general]}
                        onChange={(e) =>
                          setGeneral({ ...general, [field.key]: e.target.value })
                        }
                        className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Langue
                    </label>
                    <select
                      value={general.language}
                      onChange={(e) =>
                        setGeneral({ ...general, language: e.target.value })
                      }
                      className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                    >
                      <option>Français</option>
                      <option>English</option>
                      <option>Arabe</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white border border-slate-100 rounded-2xl p-7">
                <h2 className="text-base font-bold text-slate-900 mb-6">
                  Préférences de notifications
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    { key: 'newMember', label: 'Nouveau membre inscrit' },
                    { key: 'newEnrollment', label: 'Nouvelle inscription à un programme' },
                    { key: 'newPayment', label: 'Nouveau paiement reçu' },
                    { key: 'communityReport', label: 'Signalement communauté' },
                    { key: 'weeklyReport', label: 'Rapport hebdomadaire' },
                    { key: 'monthlyReport', label: 'Rapport mensuel' },
                  ].map((notif) => (
                    <div
                      key={notif.key}
                      className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {notif.label}
                      </span>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            [notif.key]: !notifications[notif.key as keyof typeof notifications],
                          })
                        }
                        className={`w-11 h-6 rounded-full transition-all relative ${
                          notifications[notif.key as keyof typeof notifications]
                            ? 'bg-teal-dark'
                            : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                            notifications[notif.key as keyof typeof notifications]
                              ? 'left-6'
                              : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-100 rounded-2xl p-7">
                  <h2 className="text-base font-bold text-slate-900 mb-6">
                    Paramètres de sécurité
                  </h2>
                  <div className="flex flex-col gap-5">

                    {/* 2FA Toggle */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-50">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Authentification à deux facteurs
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Sécuriser les comptes admin avec 2FA
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSecurity({ ...security, twoFactor: !security.twoFactor })
                        }
                        className={`w-11 h-6 rounded-full transition-all relative ${
                          security.twoFactor ? 'bg-teal-dark' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                            security.twoFactor ? 'left-6' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {[
                        { label: 'Timeout session (min)', key: 'sessionTimeout' },
                        { label: 'Tentatives max de connexion', key: 'maxLoginAttempts' },
                        { label: 'Longueur min mot de passe', key: 'passwordMinLength' },
                      ].map((field) => (
                        <div key={field.key} className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-slate-600">
                            {field.label}
                          </label>
                         <input
                          type="checkbox"
                          checked={security[field.key as keyof typeof security] as boolean}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <div className="bg-white border border-slate-100 rounded-2xl p-7">
                <h2 className="text-base font-bold text-slate-900 mb-6">
                  Facturation & Plans
                </h2>
                <div className="flex flex-col gap-5">
                  {[
                    { label: 'Prix plan Pro mensuel (MRU)', value: '9 900' },
                    { label: 'Prix plan Pro annuel (MRU)', value: '95 000' },
                    { label: 'Devise', value: 'MRU' },
                    { label: 'Passerelle de paiement', value: 'Stripe' },
                  ].map((field, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-600">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email */}
            {activeTab === 'email' && (
              <div className="bg-white border border-slate-100 rounded-2xl p-7">
                <h2 className="text-base font-bold text-slate-900 mb-6">
                  Configuration email
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: 'SMTP Host', placeholder: 'smtp.gmail.com' },
                    { label: 'SMTP Port', placeholder: '587' },
                    { label: 'SMTP User', placeholder: 'ton@email.com' },
                    { label: 'SMTP Password', placeholder: '••••••••' },
                    { label: 'Email expéditeur', placeholder: 'noreply@opencommunity.mr' },
                    { label: 'Nom expéditeur', placeholder: 'Open Community' },
                  ].map((field, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-600">
                        {field.label}
                      </label>
                      <input
                        type={field.label.includes('Password') ? 'password' : 'text'}
                        placeholder={field.placeholder}
                        className="border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-dark transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-6 border-2 border-teal-dark text-teal-dark px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-dark hover:text-white transition-all">
                  Tester la connexion
                </button>
              </div>
            )}

            {/* Save button */}
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
                  <>
                    <Save size={16} />
                    Sauvegarder
                  </>
                )}
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}