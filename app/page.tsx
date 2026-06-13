"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";

export default function Home() {
    const router = useRouter()
  return (
    <div className="min-h-screen pb-24 flex justify-center">
      <button className="mt-8 h-32 w-32 flex items-center justify-center bg-linear-to-br from-brand-light via-brand to-brand-dark text-foreground rounded-4xl hover:-translate-y-1 shadow-xl transition-all">
        <LuPlus onClick={() => router.push("/form/new/edit")} className="w-16 h-16" />
      </button>
    </div>
  );
}
