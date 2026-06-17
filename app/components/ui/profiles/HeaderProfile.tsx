"use client";

import { User } from "@supabase/supabase-js";
import { PrimaryBtn, SecondaryBtn } from "../buttons";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

export default function HeaderProfile(props: { user: User | null }) {
  const [openOptions, setOpenOptions] = useState(false);

  if (!props.user === null)
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-muted-dark rounded-full animate-pulse"></div>
      </div>
    );

  return (
    <div className="flex items-center gap-2 relative">
      <div>
        {openOptions && (
          <div
            className="fixed inset-0 z-999"
            onClick={() => setOpenOptions(false)}
          ></div>
        )}

        {openOptions && (
          <div className="absolute top-full right-0 mt-2 min-w-50 w-max bg-foreground z-999 border border-border shadow-lg rounded-3xl p-2">
            <div className="flex flex-col gap-1 relative">
              <div className="w-full px-4 pt-2 flex items-center text-xs text-muted-darker">
                {props.user?.email}
              </div>
              <button
                className="w-full px-4 h-11 flex items-center justify-between rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.reload();
                }}
              >
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        className={`w-8 h-8 bg-muted-dark rounded-full flex items-end justify-center overflow-hidden ${openOptions && "z-999"}`}
        onClick={() => setOpenOptions(!openOptions)}
      >
        <FaUser className="text-muted-darker" size={24} />
      </button>
    </div>
  );
}
