"use client";

import { PrimaryBtn, SecondaryBtn } from "@/app/components/ui/buttons";
import { allowScroll } from "@/helpers/dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuCheck, LuCopy, LuX, LuExternalLink } from "react-icons/lu";

export function SuccessModal({
  url,
  close,
}: {
  url: string;
  close: () => void;
}) {
  const [copied, setCopied] = useState<boolean | null>(null);
  const router = useRouter();
  
  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(null), 3000);
      })
      .catch(() => setCopied(false));
  };

  return (
    <div className="fixed inset-0 z-999 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md p-10 rounded-4xl bg-foreground flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-20 h-20 bg-brand-light/10 text-brand rounded-full flex items-center justify-center mb-6">
          <LuCheck size={40} strokeWidth={3} />
        </div>
        
        <h2 className="font-bold text-2xl mb-6">Form berhasil disimpan</h2>
        
        <div className="text-left w-full mb-8">
          <label className="text-sm font-medium text-muted-darker ml-2">Bagikan Tautan</label>
          <div className="mt-2 flex bg-brand-light/10 rounded-full border border-muted focus-within:border-brand focus-within:shadow-[0_0_0_5px_var(--brand)]/12 overflow-hidden transition-all h-14">
            <input
              value={url}
              readOnly
              className="min-w-0 flex-1 bg-transparent outline-none px-6 text-sm"
            />
            <button
              onClick={handleCopy}
              className={`px-6 flex items-center gap-2 text-sm font-semibold transition-colors ${
                copied ? "bg-green-500 text-foreground" : "bg-muted hover:bg-muted-dark"
              }`}
            >
              {copied ? <LuCheck size={18} /> : <LuCopy size={18} />}
              {copied ? "Tersalin" : "Salin"}
            </button>
          </div>
        </div>

        <div className="w-full space-y-3">
          <PrimaryBtn
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {allowScroll();router.push(url)}}
          >
            Buka Halaman Form <LuExternalLink size={18} />
          </PrimaryBtn>
          <SecondaryBtn
            className="w-full"
            onClick={close}
          >
            Tutup
          </SecondaryBtn>
        </div>
      </div>
    </div>
  );
}

export function ErrorModal({
  cause,
  code,
  close,
}: {
  cause: string;
  code: string;
  close: () => void;
}) {
  return (
    <div className="fixed inset-0 z-999 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md p-10 rounded-4xl bg-foreground flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <LuX size={40} strokeWidth={3} />
        </div>
        
        <h2 className="font-bold text-2xl mb-6">Gagal menyimpan form</h2>
        
        <div className="text-left w-full space-y-4 mb-8">
          <div>
            <div className="text-sm font-medium text-muted-darker ml-2">Penyebab</div>
            <div className="min-h-12 px-5 py-3 mt-1 rounded-[20px] bg-red-50 border border-red-100 text-sm text-red-600">
              {cause}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-darker ml-2">Kode Error</div>
            <div className="min-h-12 px-5 py-3 mt-1 rounded-[20px] bg-red-50 border border-red-100 text-sm font-mono text-red-600">
              {code}
            </div>
          </div>
        </div>

        <button
          className="w-full h-14 bg-foreground border border-muted rounded-full font-semibold hover:border-red-500 hover:text-red-500 hover:-translate-y-px transition-all"
          onClick={close}
        >
          Tutup & Coba Lagi
        </button>
      </div>
    </div>
  );
}