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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement 
    
    >
  ) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.first_name.trim())
      newErrors.first_name = "Le prénom est obligatoire.";

    if (!form.last_name.trim())
      newErrors.last_name = "Le nom est obligatoire.";

    if (!form.email.trim())
      newErrors.email = "L'email est obligatoire.";

    if (!form.phone.trim())
      newErrors.phone = "Le numéro WhatsApp est obligatoire.";

    if (!form.city.trim())
      newErrors.city = "La ville est obligatoire.";

    if (!form.profession.trim())
      newErrors.profession = "La profession est obligatoire.";

    if (!form.motivation.trim())
      newErrors.motivation = "La motivation est obligatoire.";

    if (!form.heard_from)
      newErrors.heard_from = "Veuillez sélectionner une option.";

    if (!form.accepted_terms)
      newErrors.accepted_terms =
        "Vous devez accepter les conditions.";

    console.log(newErrors);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >

  <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto relative hide-scrollbar shadow-2xl"
    >
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-2">
          {eventTitle}
        </h2>

        <p className="text-slate-500 mb-8">
          Remplissez ce formulaire pour réserver gratuitement votre place.
          Vous recevrez un email de confirmation après validation.
        </p>

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
                className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.first_name
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name}
                </p>
              )}
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
                className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.last_name
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name}
                </p>
              )}

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
              className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.email
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
            />
            {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}

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
              className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.phone
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
            />
            {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </p>
              )}
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
              className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.first_name
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
            />
            {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city}
                </p>
              )}
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
              className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.profession
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
            />
            {errors.profession && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profession}
                </p>
              )}

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
              className={`
                        border-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-colors
                        focus:outline-none
                        ${
                          errors.heard_from
                            ? "border-red-500"
                            : "border-slate-200 focus:border-teal-dark"
                        }
                      `}
            >
              {errors.heard_from && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.heard_from }
                </p>
              )}
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
              value={form.heard_from_other}
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

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            checked={form.accepted_terms}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                accepted_terms: e.target.checked,
              }))
            }
            className={`
              w-full
              rounded-xl
              border-2
              px-4
              py-3
              bg-white
              text-sm
              transition-colors
              focus:outline-none
              ${
                errors.heard_from
                  ? "border-red-500"
                  : "border-slate-200 focus:border-teal-dark"
              }
            `}
          />

          <label
            htmlFor="terms"
            className="text-sm text-slate-600 leading-relaxed"

          >
            J'accepte les conditions de participation ainsi que la politique
            de confidentialité d'Open Community.
          </label>
          {errors.accepted_terms && (
            <p className="text-red-500 text-xs">
              {errors.accepted_terms}
            </p>
          )}
        </div>

        <p className="text-center text-xs text-slate-500">
          L'inscription est <span className="font-semibold text-teal-dark">gratuite</span>.
          Aucune information ne sera partagée avec des tiers.
        </p>


          <button
            type="submit"
            disabled={loading || !form.accepted_terms}
            className="bg-teal-dark text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Inscription...
              </>
            ) : (
              <>
                Confirmer mon inscription
                <ChevronRight size={16} />
              </>

              
            )}
          </button>

        </form>



        )}
        

      </div>

    </div>
  );
}