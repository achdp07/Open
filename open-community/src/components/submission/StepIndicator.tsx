import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  step: number;
}

const steps = [
  {
    number: 1,
    title: "équipe",
  },
  {
    number: 2,
    title: "Projet",
  },
  {
    number: 3,
    title: "Revue",
  },
];

export default function StepIndicator({ step }: Props) {
  return (
    <div className="w-full">

      <div className="flex items-center">

        {steps.map((item, index) => {

          const completed = step > item.number;
          const active = step === item.number;

          return (
            <div
              key={item.number}
              className="flex items-center flex-1 last:flex-none"
            >
              {/* Circle */}

              <motion.div
                animate={{
                  scale: active ? 1.05 : 1,
                }}
                transition={{
                  duration: .2,
                }}
                className={`
                  relative
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-full
                  font-semibold
                  text-sm
                  shrink-0
                  transition-colors
                  ${
                    completed
                      ? "bg-lime-bright text-white"
                      : active
                      ? "bg-teal-dark text-white"
                      : "bg-slate-100 text-slate-400"
                  }
                `}
              >
                {completed ? (
                  <Check size={18} />
                ) : (
                  item.number
                )}
              </motion.div>

              {/* Line */}

              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-slate-100 mx-3 relative overflow-hidden">

                  <motion.div
                    initial={false}
                    animate={{
                      width: completed ? "100%" : "0%",
                    }}
                    transition={{
                      duration: .35,
                    }}
                    className="absolute inset-y-0 left-0 bg-lime-bright"
                  />

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Labels */}

      <div className="flex mt-4">

        {steps.map((item) => {

          const active = step === item.number;

          return (
            <div
              key={item.number}
              className="flex-1"
            >
              <p
                className={`
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    active
                      ? "text-teal-dark"
                      : "text-slate-400"
                  }
                `}
              >
                {item.title}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}