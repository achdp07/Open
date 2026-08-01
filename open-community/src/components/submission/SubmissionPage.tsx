import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";

import TeamStep from "./TeamStep";
import ProjectStep from "./ProjectStep";
import ReviewStep from "./ReviewStep";
import StepIndicator from "./StepIndicator";
import SuccessStep from "./SucessStep";

import {
  uploadProjectDocument,
  uploadVisualAssets,
} from "../../services/storage";

import {
  submitHackathonProject,
  type HackathonSubmissionPayload,
} from "../../services/submission";

export interface SubmissionForm {
  team_name: string;
  dataset_used: string;
  project_link: string;
  project_document: File | null;
  visual_assets: File[];
}

export default function SubmissionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<SubmissionForm>({
    team_name: "",
    dataset_used: "",
    project_link: "",
    project_document: null,
    visual_assets: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const next = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const validate = () => {
    if (!form.team_name.trim()) {
      alert("Please enter your team name.");
      return false;
    }

    if (!form.dataset_used) {
      alert("Please select a dataset.");
      return false;
    }

    if (!form.project_document) {
      alert("Please upload your project document.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      // Upload files to Supabase
      const projectDocumentUrl = await uploadProjectDocument(
        form.project_document!
      );

      const visualAssetsUrls = await uploadVisualAssets(
        form.visual_assets
      );

      // Build payload
      const payload: HackathonSubmissionPayload = {
        team_name: form.team_name.trim(),
        dataset_used: form.dataset_used,
        project_document_url: projectDocumentUrl,
        visual_assets_urls: visualAssetsUrls,
        project_link: form.project_link.trim() || null,
      };

      // Save in Django
      await submitHackathonProject(
        "indabax-mr-2026",
        payload
      );

      setSuccess(true);

    } catch (err: any) {
      console.error(err);

      if (err?.detail) {
        alert(err.detail);
      } else if (err?.message) {
        alert(err.message);
      } else {
        alert("Unable to submit your project.");
      }

    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessStep
     />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-dark mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="">

          {/* Header */}

          <div className=" px-10 py-8">

            <h1 className="text-4xl font-bold">
              Submit your Project
            </h1>

            <p className="text-slate-500 mt-2">
              Complete the three steps below to submit your project.
            </p>

            <div className="mt-8">
              <StepIndicator step={step} />
            </div>

          </div>

          {/* Body */}

          <div className="px-10 py-10 min-h-[520px]">

            <AnimatePresence mode="wait">

              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >

                {step === 1 && (
                  <TeamStep
                    form={form}
                    setForm={setForm}
                  />
                )}

                {step === 2 && (
                  <ProjectStep
                    form={form}
                    setForm={setForm}
                    errors={errors}
                  />
                )}

                {step === 3 && (
                  <ReviewStep
                    form={form}
                    setForm={setForm}
                  />
                )}

              </motion.div>

            </AnimatePresence>

          </div>

          {/* Footer */}

          <div className="sticky bottom-0 bg-white  px-10 py-6 flex justify-between">

            <button
              onClick={back}
              disabled={step === 1 || loading}
              className="border border-slate-200 rounded-xl px-6 py-3 disabled:opacity-40"
            >
              Retour
            </button>

            {step < 3 ? (
              <button
                onClick={next}
                className="bg-teal-dark text-white rounded-xl px-8 py-3 font-semibold"
              >
                Continuer
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-teal-dark text-white rounded-xl px-8 py-3 font-semibold disabled:opacity-50"
              >
                {loading
                  ? "Soumission en cours..."
                  : "Soumettre"}
              </button>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}