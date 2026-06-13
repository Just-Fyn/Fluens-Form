"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "../components/submission/Question";
import { useFormSubmissionStore } from "@/stores/form-submission-store";
import { LuCheck } from "react-icons/lu";
import { PrimaryBtn, SecondaryBtn } from "@/app/components/ui/buttons";
import LoadingForm from "@/app/components/ui/loadingviews";

export default function SubmissionPage() {
  const router = useRouter();
  const { id } = useParams();
  const [status, setStatus] = useState<string>("filling");
  const [result, setResult] = useState<string | null>(null);

  const { form, getByToken, validated } = useFormSubmissionStore();

  useEffect(() => {
    if (!id) return;
    (async () => {
      getByToken(id as string);
    })();
  }, [id, getByToken]);

  const submit = async () => {
    if (status === "sending") return;

    setStatus("sending");

    if (!validated) return setStatus("filling");

    const res = await fetch("/api/submission", {
      method: "post",
      body: JSON.stringify({
        submission: form,
      }),
    });

    const payload = await res.json();

    if (!res.ok || !payload.success) return setStatus("error");

    setResult(payload.data.uuid);

    setStatus("sent");
  };

  return form ? (
    <div className="min-h-screen pb-24">
      <div className="md:px-8 pt-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {status === "sent" ? (
            <div className="relative bg-foreground rounded-4xl p-12 overflow-hidden border border-muted shadow-2xl flex flex-col items-center text-center mt-12">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                <LuCheck size={40} strokeWidth={4} />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {form?.title}
              </h2>
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
                  onClick={() => getByToken(id as string)}
                >
                  Kirim respon lain
                </SecondaryBtn>
              </div>
            </div>
          ) : (
            <div className="space-y-6" spellCheck={false}>
              <div className="relative bg-foreground rounded-4xl p-10 overflow-hidden border border-muted shadow-lg">
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
                <SecondaryBtn onClick={() => router.push("/")}>
                  Kembali
                </SecondaryBtn>
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
    </div>
  ) : (
    <LoadingForm text="Menyiapkan formulir" />
  );
}
