"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "../../components/Question";
import { useFormEditorStore } from "@/stores/form-editor-store";
import { useShallow } from "zustand/react/shallow";
import { LuPlus } from "react-icons/lu";
import { ErrorModal, SuccessModal } from "../../components/modals";
import { allowScroll, preventScroll } from "@/helpers/dom";
import Textarea from "react-textarea-autosize";
import { PrimaryBtn, SecondaryBtn } from "@/app/components/ui/buttons";
import LoadingForm from "@/app/components/ui/loadingviews";
import { supabase } from "@/utils/supabase/client";
import { toCamel } from "@/helpers/case-converter";
import { EditorForm, Form } from "@/types/form";
import { getSession, getUser } from "@/lib/client/auth";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";
import { AppError } from "@/lib/app-error";
import AlertModal from "@/app/components/ui/AlertModal";

export default function SubmissionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [status, setStatus] = useState("initialize");
  const [error, setError] = useState<{ message: string; code: string } | null>(
    null,
  );

  const [initError, setInitError] = useState<{
    message: string;
    code: string;
  } | null>(null);

  const {
    title,
    description,
    questions,
    shareToken,
    getForm,
    newForm,
    setForm,
    updateForm,
    addQuestion,
    saveForm,
  } = useFormEditorStore(
    useShallow((s) => ({
      title: s.form.title,
      description: s.form.description,
      questions: s.form.questions,
      shareToken: s.form.shareToken,
      getForm: s.getForm,
      newForm: s.newForm,
      setForm: s.setForm,
      updateForm: s.updateForm,
      addQuestion: s.addQuestion,
      saveForm: s.saveForm,
    })),
  );

  const handleSaveForm = async () => {
    if (status === "saving") return;
    setStatus("saving");
    try {
      const isCreating = !shareToken;

      const data = await saveForm();

      if (isCreating && data) {
        setForm(data);
      }

      const finalToken = data.shareToken || shareToken;

      preventScroll();
      setStatus("success");

      if (isCreating && finalToken) {
        window.history.replaceState(null, "", `/form/${finalToken}/edit`);
      }
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

  const questionIds = questions.map((q) => q.id);
return title ? (
    <div className="pb-24">
      <div className="md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6" spellCheck={false}>
            <div className="relative bg-foreground rounded-4xl p-10 overflow-hidden border border-border shadow-lg">
              <div className="absolute -top-30 -right-30 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.15),transparent)]"></div>

              <div className="relative z-10">
                <Textarea
                  className="w-full text-3xl md:text-4xl font-bold tracking-tight mb-4 outline-none resize-none"
                  minRows={1}
                  defaultValue={title}
                  onBlur={(e) =>
                    updateForm({
                      title: !title.trim()
                        ? "Formulir Tanpa Judul"
                        : e.target.value,
                    })
                  }
                />
                <Textarea
                  className="w-full text-lg text-muted-darker leading-[1.8] overflow-hidden outline-none resize-none"
                  defaultValue={description}
                  onBlur={(e) => updateForm({ description: e.target.value })}
                  placeholder="Deskripsi singkat (opsional)"
                  minRows={1}
                />
              </div>
            </div>

            <div className="space-y-6">
              {questionIds.length ? (
                questionIds.map((qId, qi) => (
                  <Question key={qId} qId={qId} qi={qi} />
                ))
              ) : (
                <div className="justify-self-center z-100 transition-all duration-300">
                  <button
                    type="button"
                    className="h-12 w-12 flex items-center justify-center bg-linear-to-br from-brand-light via-brand to-brand-dark text-foreground rounded-full hover:-translate-y-1  shadow-xl transition-all"
                    onClick={() => addQuestion()}
                  >
                    <LuPlus size={24} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex px-4 md:px-0 gap-4 justify-end pt-10">
              <SecondaryBtn onClick={() => router.back()}>
                Kembali
              </SecondaryBtn>
              <PrimaryBtn
                onClick={handleSaveForm}
                disabled={status === "saving"}
              >
                {status === "saving" ? "Menyimpan..." : "Simpan"}
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>

      {status === "success" && (
        <SuccessModal
          url={`${window.origin}/f/${shareToken}`}
          close={() => {
            setStatus("editing");
            allowScroll();
          }}
        />
      )}

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
    <LoadingForm text="Membuka editor" />
  );
}
