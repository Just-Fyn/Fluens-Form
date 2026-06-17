"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "../components/Question";
import { SubmissionQuestion } from "@/types/form";
import { SecondaryBtn } from "@/app/components/ui/buttons";
import LoadingForm from "@/app/components/ui/loadingviews";
import { AppError } from "@/lib/app-error";
import AlertModal from "@/app/components/ui/AlertModal";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";

export default function SubmissionPage() {
  const { id } = useParams();
  const [result, setResult] = useState<any | null>();
  const router = useRouter();
  const [initError, setInitError] = useState<{
    message: string;
    code: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/submission/${id}`);
        const { data, error } = await res.json();

        if (error) {
          throw new AppError(error);
        }

        setResult(data.submission);
      } catch (err: any) {
        if (err instanceof AppError || err instanceof SupabaseAuthError) {
          return setInitError({ message: err.message, code: err.code });
        }

        setInitError({
          message: "Terjadi kesalahan, coba lagi.",
          code: "UNKNOWN_ERROR",
        });
      }
    })();
  }, [id]);

  if (initError) {
    return AlertModal({ message: initError.message });
  }

  return result ? (
    <div className="min-h-screen pb-24">
      <div className="md:px-8 pt-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative bg-foreground rounded-4xl p-10 overflow-hidden border border-border shadow-lg">
            <div className="absolute -top-30 -right-30 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.15),transparent)]"></div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 outline-none resize-none">
                {result?.data.title}
              </h1>

              <p className="text-lg text-muted-darker leading-[1.8] outline-none resize-none">
                {result?.data.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 h-9 px-5 rounded-full bg-brand-light/10 text-brand text-sm font-semibold">
                Skor: {result.data.score} / {result.data.totalScore}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {result.data.submissionQuestions.map((q: SubmissionQuestion) => (
              <Question key={q.id} q={q} />
            ))}
          </div>

          <div className="flex px-4 md:px-0 justify-end pt-4">
            <SecondaryBtn onClick={() => router.push("/")}>
              Kembali
            </SecondaryBtn>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingForm text="Mengambil hasil" />
  );
}
