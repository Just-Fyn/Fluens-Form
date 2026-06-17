"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "./components/Question";
import { useFormSubmissionStore } from "@/stores/form-submission-store";
import { LuCheck, LuCircleAlert } from "react-icons/lu";
import { PrimaryBtn, SecondaryBtn } from "@/app/components/ui/buttons";
import LoadingForm from "@/app/components/ui/loadingviews";
import { AppError } from "@/lib/app-error";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";
import { allowScroll, preventScroll } from "@/helpers/dom";
import { ErrorModal } from "./components/modals";
import AlertModal from "@/app/components/ui/AlertModal";

export default function SubmissionPage() {
  const router = useRouter();
  const { token } = useParams();
  const [status, setStatus] = useState<string>("initialize");
  const [error, setError] = useState<{ message: string; code: string } | null>(
    null,
  );
  const [initError, setInitError] = useState<{
    message: string;
    code: string;
  } | null>(null);

  const [result, setResult] = useState<string | null>(null);

  const { form, setForm, validated } = useFormSubmissionStore();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(`/api/form/${token}/public`);

        const { data, error } = await res.json();

        if (error) {
          throw new AppError(error);
        }

        setForm(data.submissionForm);
        setStatus("filling");
      } catch (err: any) {
        if (err instanceof AppError || err instanceof SupabaseAuthError) {
          return setInitError({ message: err.message, code: err.code });
        }

        setInitError({
          message: "Terjadi kesalahan, coba lagi.",
          code: "UNKNOWN_ERROR",
        });
        setStatus("error")
      }
    })();
  }, [token]);

  const submit = async () => {
    if (status === "sending") return;
    setStatus("sending");
    try {
      if (!validated) return setStatus("filling");

      const res = await fetch("/api/submission", {
        method: "post",
        body: JSON.stringify({
          submission: form,
        }),
      });

      const { data, error } = await res.json();

      if (error) {
        throw new AppError(error);
      }

      setResult(data.uuid);

      setStatus("sent");
    } catch (err) {
      if (err instanceof AppError || err instanceof SupabaseAuthError) {
        setError(err);
      } else {
        setError({
          message: "Terjadi kesalahan, coba lagi.",
          code: "UNKNOWN_ERROR",
        });
      }
      preventScroll();
      setStatus("error");
    }
  };

  
    if (initError) {
      return AlertModal({ message: initError.message });
    }

  return form ? (
    <div className="min-h-screen pb-24">
      <div className="md:px-8 pt-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {status === "sent" ? (
            <div className="relative bg-foreground rounded-4xl p-12 overflow-hidden border border-border shadow-2xl flex flex-col items-center text-center mt-12">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                <LuCheck size={40} strokeWidth={4} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{form?.title}</h2>
              <p className="text-muted-darker mb-8">{form?.description}</p>

              <div className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-green-50 border border-green-100 text-green-600 font-semibold mb-8">
                Respon terkirim
              </div>

              <div className="w-full space-y-3">
                {status === "sent" && result && (
                  <PrimaryBtn
                    className="w-full"
                    onClick={() => router.push(`/result/${result}`)}
                  >
                    Lihat hasil
                  </PrimaryBtn>
                )}
                <SecondaryBtn
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  Kirim respon lain
                </SecondaryBtn>
              </div>
            </div>
          ) : (
            <div className="space-y-6" spellCheck={false}>
              <div className="relative bg-foreground rounded-4xl p-10 overflow-hidden border border-border shadow-lg">
                <div className="absolute -top-30 -right-30 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.15),transparent)]"></div>
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 outline-none resize-none">
                    {form?.title}
                  </h1>
                  <p className="text-lg text-muted-darker leading-[1.8] outline-none resize-none">
                    {form?.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {form.submissionQuestions.map((q) => (
                  <Question key={q.id} q={q} />
                ))}
              </div>

              <div className="flex px-4 md:px-0 gap-4 justify-end pt-4">
                <PrimaryBtn
                  disabled={status === "sending" || !validated}
                  onClick={submit}
                >
                  {status === "sending" ? "Mengirim..." : "Kirim"}
                </PrimaryBtn>
              </div>
            </div>
          )}
        </div>
      </div>
            {error && (
              <ErrorModal
                message={error.message}
                code={error.code}
                close={() => {
                  setError(null);
                  setStatus("editing");
                  allowScroll();
                }}
              />
            )}
    </div>
  ) : (
    <LoadingForm text="Menyiapkan formulir" />
  );
}
