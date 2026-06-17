"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id === "new") {
      router.replace("/form/new/edit");
    } else {
      router.replace(`/f/${id}`);
    }
  }, []);
  return <div></div>;
}
