"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuPlus, LuSearch, LuX } from "react-icons/lu";
import { PrimaryBtn, SecondaryBtn } from "../../../components/ui/buttons";
import { useEffect, useState } from "react";
import { Form } from "@/types/form";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { toCamel } from "@/helpers/case-converter";
import FormCard, {
  SkeletonFormCard,
} from "../../../components/ui/form/FormCard";
import HeaderProfile from "../../../components/ui/profiles/HeaderProfile";
import {
  FaCross,
  FaDizzy,
  FaFax,
  FaMeh,
  FaMehBlank,
  FaSearch,
  FaThList,
} from "react-icons/fa";
import { TextInput } from "@/app/components/ui/inputs";
import { deleteForm } from "@/lib/client/supabase/forms-actions";
import { AppError } from "@/lib/app-error";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";

export default function Home() {
  const router = useRouter();
  const [forms, setForms] = useState<Partial<Form>[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState<{ message: string; code: string } | null>(
    null,
  );

  const displayedForms = forms?.filter((f) =>
    searchKeyword !== ""
      ? f.title?.toLowerCase().includes(searchKeyword.toLowerCase())
      : true,
  );

  const handleDelete = async (shareToken: string) => {
    try {
      await deleteForm(shareToken);

      const selectFormsRes = await supabase
        .from("forms")
        .select("title, share_token, created_at, updated_at");

      if (selectFormsRes.error) {
        throw new AppError(error);
      }
      const forms = selectFormsRes.data?.map((f) =>
        toCamel(f),
      ) as Partial<Form>[];

      setForms(forms);
    } catch (err) {
      if (err instanceof AppError || err instanceof SupabaseAuthError) {
        setError(err);
      } else {
        setError({
          message: "Terjadi kesalahan, coba lagi",
          code: "UNKNOWN_ERROR",
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const getUserRes = await supabase.auth.getUser();
        const user = getUserRes.data.user;

        if (!user) return;

        setUser(user);

        const selectFormsRes = await supabase
          .from("forms")
          .select("title, share_token, created_at, updated_at");

        const forms = selectFormsRes.data?.map((f) =>
          toCamel(f),
        ) as Partial<Form>[];

        if (!forms?.length) return;

        setForms(forms);
      } catch (err) {}
    })();
  }, []);
  return (
    <div className="container min-h-screen flex pt-26">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6">
        <div className="relative flex items-center">
          <TextInput
            className="bg-foreground pl-12 peer"
            type="text"
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Cari"
          />
          <LuSearch
            className="absolute left-4 text-muted-dark peer-focus-within:text-brand transition-colors"
            size={20}
          />
        </div>
        <button
          className="w-full flex items-center justify-center p-4 border border-border text-foreground bg-brand hover:bg-brand-light transition-all rounded-3xl"
          onClick={() => router.push("/app/form/new/edit")}
        >
          <LuPlus className="stroke-1" size={48} />
          <div className="text-2xl font-light">Form Baru</div>
        </button>
        {forms ? (
          displayedForms?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedForms.map((f) => (
                <FormCard
                  key={f.shareToken!}
                  {...f}
                  highlight={searchKeyword}
                  deleteForm={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative">
                <FaThList className="text-muted" size={96} />
                <LuX
                  className="absolute right-0 bottom-0 translate-1/2 text-muted-dark"
                  size={64}
                />
              </div>
              <div className="mt-8 text-center font-bold text-2xl text-muted">
                Form Tidak Ditemukan
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 min-[462px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonFormCard key={idx} className="last:md:hidden last:xl:flex" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
