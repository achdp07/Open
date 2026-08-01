import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Users } from "lucide-react";

interface Member {
  first_name: string;
  last_name: string;
  email: string;
}

interface Props {
  members: Member[];
  onChange: (members: Member[]) => void;
}

export default function TeamMembers({
  members,
  onChange,
}: Props) {

  const addMember = () => {
    onChange([
      ...members,
      {
        first_name: "",
        last_name: "",
        email: "",
      },
    ]);
  };

  const removeMember = (index: number) => {
    onChange(members.filter((_, i) => i !== index));
  };

  const updateMember = (
    index: number,
    field: keyof Member,
    value: string
  ) => {

    const updated = [...members];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  return (
    <div>

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-xl bg-teal-dark/10 flex items-center justify-center">

          <Users
            size={20}
            className="text-teal-dark"
          />

        </div>

        <div>

          <h4 className="font-semibold text-slate-900">
            Membres de l'équipe
          </h4>

          <p className="text-sm text-slate-500">
            Ajoutez ceux qui ont contribué à ce projet.
          </p>

        </div>

      </div>

      <AnimatePresence>

        {members.map((member, index) => (

          <motion.div
            key={index}
            layout
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: .2,
            }}
            className="mb-5 border border-slate-200 rounded-2xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <h5 className="font-semibold text-slate-900">

                Membre {index + 2}

              </h5>

              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Prénom"
                value={member.first_name}
                onChange={(e) =>
                  updateMember(
                    index,
                    "first_name",
                    e.target.value
                  )
                }
                className="border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-dark"
              />

              <input
                placeholder="Nom"
                value={member.last_name}
                onChange={(e) =>
                  updateMember(
                    index,
                    "last_name",
                    e.target.value
                  )
                }
                className="border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-dark"
              />

            </div>

            <input
              placeholder="Adresse e-mail"
              type="email"
              value={member.email}
              onChange={(e) =>
                updateMember(
                  index,
                  "email",
                  e.target.value
                )
              }
              className="mt-4 w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-dark"
            />

          </motion.div>

        ))}

      </AnimatePresence>

      {/* Add */}

      <button
        type="button"
        onClick={addMember}
        className="
          mt-2
          w-full
          border-2
          border-dashed
          border-slate-300
          rounded-2xl
          py-4
          flex
          items-center
          justify-center
          gap-2
          font-medium
          text-slate-600
          hover:border-teal-dark
          hover:text-teal-dark
          transition-all
        "
      >

        <Plus size={18} />

        Ajouter un membre

      </button>

    </div>
  );
}
