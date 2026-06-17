"use client";

import { PrimaryBtn } from "@/app/components/ui/buttons";
import { TextInput } from "@/app/components/ui/inputs";
import { PrimaryTextarea } from "@/app/components/ui/textareas";
import { validateCredentials } from "@/helpers/inputs-validator";
import { supabase } from "@/utils/supabase/client";
import { SupabaseAuthError } from "@/lib/supabase-auth-error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeClosed, LuEyeOff } from "react-icons/lu";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ message: string; code: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isLoading) return;
    try {
      setIsLoading(true);

      validateCredentials(email, password);
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw new SupabaseAuthError(error);
      }

      router.replace("/");
    } catch (err) {
      if (err instanceof SupabaseAuthError) {
        return setError({message: err.message, code: err.code})
      }
      setError({
        message: "Terjadi kesalahan, coba lagi",
        code: "UNKNOWN_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full bg-foreground p-8 max-w-lg rounded-3xl shadow-lg border border-border space-y-8">
        <div className="py-8 text-4xl font-bold text-center bg-linear-to-r from-brand-dark via-brand to-brand-light bg-clip-text text-transparent">
          <div>Daftar</div>
        </div>
        {error && (
          <div className="min-h-12 px-5 py-3 rounded-[20px] bg-red-50 border border-red-100 text-sm text-red-600">
            {error.message}
          </div>
        )}
        <div className="">
          <label className="pl-4 text-brand tracking-wide">Email</label>
          <TextInput
            type="email"
            className="mt-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              error && setError(null);
            }}
            autoComplete="email"
          />
        </div>
        <div className="">
          <label className="pl-4 text-brand tracking-wide">Password</label>
          <div className="relative mt-2 flex items-center">
            <TextInput
              type={showPassword ? "text" : "password"}
              className="pr-14"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                error && setError(null);
              }}
            />
            <button
              className="absolute right-0 text-foreground h-full px-4 bg-brand rounded-r-3xl"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </button>
          </div>
        </div>
        <PrimaryBtn className="mt-8 w-full" onClick={handleSubmit}>
          Daftar
        </PrimaryBtn>
      </div>
    </div>
  );
}
