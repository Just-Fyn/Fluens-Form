"use client";

import AlertModal from "@/app/components/ui/AlertModal";
import LoadingForm from "@/app/components/ui/loadingviews";
import { toCamel } from "@/helpers/case-converter";
import { AppError } from "@/lib/app-error";
import { getSession } from "@/lib/client/auth";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";
import { useFormEditorStore } from "@/stores/form-editor-store";
import { EditorForm } from "@/types/form";
import { supabase } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import EditorBar from "../components/EditorBar";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<string>("initialize");
  const [initError, setInitError] = useState<{
    message: string;
    code: string;
  } | null>(null);

  const { shareToken, newForm, setForm } = useFormEditorStore(
    useShallow((s) => ({
      shareToken: s.form.shareToken,
      newForm: s.newForm,
      setForm: s.setForm,
    })),
  );
  useEffect(() => {
    if (!id) router.replace("/form/new/edit");
    if (id === "new") {
      newForm();
      return setStatus("editing");
    }
    (async () => {
      const token = id;
      try {
        const session = await getSession();

        if (!session)
          throw new AppError({
            message: "Silahkan login terlebih dahulu",
            code: "UNATHORIZED",
          });

        const { data, error } = await supabase
          .from("forms")
          .select(
            "share_token, title, description, questions, settings, total_score",
          )
          .eq("share_token", token)
          .eq("creator_id", session.user.id)
          .single();

        if (error) {
          if (error.code === "PGRST116")
            throw new AppError({
              message: "Data tidak ada atau Anda tidak memiliki akses",
              code: "NOT_FOUND",
            });

          if (error.code === "22P02")
            throw new AppError({
              message: "URL tidak valid",
              code: "BAD_REQUEST",
            });
          throw new AppError(error);
        }

        setForm(toCamel(data) as EditorForm);
        setStatus("editing");
      } catch (err: any) {
        if (err.code.toUpperCase() === "UNATHORIZED")
          return router.replace(
            `/u/login?redirect=${window.location.pathname}`,
          );

        if (err instanceof AppError || err instanceof SupabaseAuthError) {
          return setInitError({ message: err.message, code: err.code });
        }

        setInitError({
          message: "Terjadi kesalahan, coba lagi.",
          code: "UNKNOWN_ERROR",
        });
        setStatus("error");
      }
    })();
  }, [id]);

  if (initError) {
    return AlertModal({ message: initError.message });
  }
  return status !== "initialize" ? (
    <div>
      <EditorBar />
      <div className="pt-36">{children}</div>
    </div>
  ) : (
    <LoadingForm text="Membuka editor" />
  );
}
