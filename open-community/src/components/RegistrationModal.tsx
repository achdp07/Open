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
    'LinkedIn',
    'WhatsApp',
    'Site web Open Community',
    'Université / École',
    '2mih',
    'Organisation partenaire',
    'Autre',
  ];

  const Profession = [
    'Étudiant(e)',
    'Développeur(se) / Ingénieur(e) logiciel',
    'Data Scientist / Analyste de données',
    'Professionnel(le) du secteur financier / économique',
    'Entrepreneur(e) / Porteur(se) de projet',
    'Autre',
  ]

  const Domaine = [
    'Machine Learning / IA',
    'Visualisation de données',
    'Analyse de données ',
    'Développement Web',
    'Design UI / UX',
    'Gestion de projet',
  ]

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    domaine:'',
    domaine_other:'',
    motivation: '',
    source: '',
    prof: '',
    prof_other: '',
    heard_from: '',
    heard_from_other: '',
    accepted_terms: false,
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

    if (!form.profession.trim())
      newErrors.profession = "Veuillez indiquer votre profession.";

    if (!form.heard_from)
      newErrors.heard_from = "Veuillez sélectionner une option.";

    if (!form.domaine)
      newErrors.domaine = "Veuillez indiquer votre domaine.";

    if (!form.prof)
      newErrors.prof = "Veuillez sélectionner une option.";

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
      className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex justify-center items-center p-4"
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
                name="first_name"
                type="text"
                placeholder="Prénom"
                value={form.first_name}
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

                name="last_name"
                type="text"
                placeholder="Nom"
                value={form.last_name}
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
              
              name="email"
              type="email"
              placeholder="ton@email.com"
              value={form.email}
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
              
              name="phone"
              type="tel"
              placeholder="+222 xx xx xx xx"
              value={form.phone}
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

          {/* Profession */}
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Profession
            </label>
            <div className="relative">
              <select
                name="prof"
                value={form.prof}
                onChange={handleChange}
                className={`
                  w-full
                  appearance-none
                  border-2
                  rounded-xl
                  px-3
                  py-2.5
                  pr-10
                  text-sm
                  bg-white
                  transition-colors
                  focus:outline-none
                  ${
                    errors.prof
                      ? "border-red-500"
                      : "border-slate-200 focus:border-teal-dark"
                  }
                `}
                >
                <option value="">Sélectionnez une option</option>

                  {Profession.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            {errors.prof && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.prof}
                </p>
              )}

          </div>
          

          {form.prof === 'Autre' && (
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-600">
              Précisez
            </label>

            <input
              type="text"
              name="prof_other"
              value={form.prof_other}
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

          

          {/* Domaine d'Expertise */}
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Domaine d'expertise 
            </label>
            <div className="relative">
              <select
                name="domaine"
                value={form.domaine}
                onChange={handleChange}
                className={`
                  w-full
                  appearance-none
                  border-2
                  rounded-xl
                  px-3
                  py-2.5
                  pr-10
                  text-sm
                  bg-white
                  transition-colors
                  focus:outline-none
                  ${
                    errors.prof
                      ? "border-red-500"
                      : "border-slate-200 focus:border-teal-dark"
                  }
                `}
                >
                <option value="">Sélectionnez une option</option>

                  {Domaine.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            {errors.domaine && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.domaine}
                </p>
              )}

            </div>
          

          {form.prof === 'Autre' && (
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-600">
              Précisez
            </label>

            <input
              type="text"
              name="domaine_other"
              value={form.domaine_other}
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
          

          {/* Source */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Comment avez-vous entendu parler de nous ?
            </label>
          <div className="relative">
            <select
              name="heard_from"
              value={form.heard_from}
              onChange={handleChange}
              className={`
                w-full
                appearance-none
                border-2
                rounded-xl
                px-3
                py-2.5
                pr-10
                text-sm
                bg-white
                transition-colors
                focus:outline-none
                ${
                  errors.heard_from
                    ? "border-red-500"
                    : "border-slate-200 focus:border-teal-dark"
                }
              `}
              >
                <option value="">Sélectionnez une option</option>

                  {referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
            </select>

            </div>

            {errors.heard_from && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.heard_from }
                </p>
              )}

          </div>
          

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
            className="mt-1 h-4 w-4 accent-teal-dark shrink-0"
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