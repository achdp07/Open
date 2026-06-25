import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';
import { ChevronRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventSlug: string;
  eventTitle: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  eventSlug,
  eventTitle,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const referralOptions = [
    'Facebook',
    'Instagram',
    'LinkedIn',
    'WhatsApp',
    'Telegram',
    'Site web Open Community',
    'Université / École',
    'Un ami ou une connaissance',
    'Événement Open Community',
    'Organisation partenaire',
    'Autre',
  ];

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    organization: '',
    motivation: '',
    source: '',
    heard_from: '',
    heard_from_other: '',
    accepted_terms: true,
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.registerPublicEvent({
        event_slug: eventSlug,
        ...form,
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">

      <div className="bg-white rounded-3xl w-120 max-w-2xl p-8 max-h-[90vh] overflow-y-auto relative hide-scrollbar">

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-2">
          {eventTitle}
        </h2>

        {success ? (

          <div className="py-12 text-center">

            <h3 className="text-2xl font-bold text-teal-dark mb-3">
              🎉 Inscription confirmée
            </h3>

            <p>
              Merci pour votre inscription.
            </p>

          </div>

        ) : (

          <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {/* Nom */}

          <div className="grid grid-cols-2 gap-3">

            <div className="flex flex-col gap-1.5">

              <label className="text-xs font-semibold text-slate-600">

                Prénom

              </label>

              <input
                required
                name="first_name"
                type="text"
                placeholder="Prénom"
                onChange={handleChange}
                className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
              />

            </div>

            <div className="flex flex-col gap-1.5">

              <label className="text-xs font-semibold text-slate-600">

                Nom

              </label>

              <input
                required
                name="last_name"
                type="text"
                placeholder="Nom"
                onChange={handleChange}
                className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
              />

            </div>

          </div>

          {/* Email */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              Email

            </label>

            <input
              required
              name="email"
              type="email"
              placeholder="ton@email.com"
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* WhatsApp */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              WhatsApp

            </label>

            <input
              required
              name="phone"
              type="tel"
              placeholder="+222 xx xx xx xx"
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* Ville */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              Ville

            </label>

            <input
              required
              name="city"
              type="text"
              placeholder="Nouakchott"
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* Profession */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              Profession

            </label>

            <input
              required
              name="profession"
              type="text"
              placeholder="Étudiant, Ingénieur..."
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* Organisation */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              Organisation

            </label>

            <input
              name="organization"
              type="text"
              placeholder="Université, entreprise..."
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* Motivation */}

          <div className="flex flex-col gap-1.5">

            <label className="text-xs font-semibold text-slate-600">

              Motivation

            </label>

            <textarea
              required
              name="motivation"
              rows={3}
              placeholder="Pourquoi souhaitez-vous participer ?"
              onChange={handleChange}
              className="border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-teal-dark transition-colors"
            />

          </div>

          {/* Source */}

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Comment avez-vous entendu parler de nous ?
            </label>

            <select
              name="heard_from"
              value={form.heard_from}
              onChange={handleChange}
              className=" 
                w-full
                rounded-2xl
                border
                border-slate-300
                px-4
                py-4
                bg-white
                text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-teal-dark
              "
            >
              <option value="">Sélectionnez une option</option>

              {referralOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {form.heard_from === 'Autre' && (
          <div className="mt-4">
            <label className="block mb-2 font-semibold text-slate-700">
              Précisez
            </label>

            <input
              type="text"
              name="heard_from_other"
              value={formData.heard_from_other}
              onChange={handleChange}
              placeholder="Précisez..."
              className="
                w-full
                rounded-2xl
                border-2
                border-slate-200
                px-4
                py-4
                focus:outline-none
                focus:ring-2
                focus:ring-teal-dark
              "
            />
          </div>
        )}

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-dark text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
          >

            {loading
              ? 'Inscription...'
              : 'Confirmer mon inscription'}

            {!loading && (
              <ChevronRight size={16} />
            )}

          </button>

        </form>

        )}

      </div>

    </div>
  );
}