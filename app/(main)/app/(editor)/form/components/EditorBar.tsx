"use client";

import { useFormEditorStore } from "@/stores/form-editor-store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditorBar() {
  const [isMinimize, setIsMinimize] = useState<boolean>(false);
  const scrollPos = useRef(0);
  const pathname = usePathname().split("/");
  const router = useRouter()

  const shareToken = useFormEditorStore((s) => s.form.shareToken)

  const url = `${window.origin}/app/form/${shareToken??"new"}`

  const currentPath = pathname.pop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollPos.current) {
        if (!isMinimize) setIsMinimize(true);
      } else {
        setIsMinimize(false);
      }

      scrollPos.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="fixed inset-0 h-max top-0 bg-foreground border-b border-border px-6 z-500">
      <div className="h-20 flex items-center justify-between">
        <button className="flex items-center" onClick={() => router.push("/app")}>
          <img src="/fluens.png" className="w-16" />
          <div className="ml-2 font-light tracking-widest text-2xl text-transparent bg-linear-to-l from-brand-light via-brand to-brand-dark bg-clip-text">
            Form
          </div>
        </button>
      </div>
      <div hidden={isMinimize} className="pb-4 flex justify-center gap-6">
        <Link
          className={`${currentPath === "edit" && "text-brand"} text-sm`}
          href={`${url}/edit`}
        >
          Editor
        </Link>
        <Link
          className={`${currentPath === "responses" && "text-brand"} text-sm`}
          href={`${url}/responses`}
        >
          Respon
        </Link>
        <Link
          className={`${currentPath === "settings" && "text-brand"} text-sm`}
          href={`${url}/settings`}
        >
          Pengaturan
        </Link>
      </div>
    </header>
  );
}
