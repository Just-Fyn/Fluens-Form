"use client";

import HeaderProfile from "@/app/components/ui/profiles/HeaderProfile";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  LuChevronLeft,
  LuMenu,
  LuPanelLeft,
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [openSide, setOpenSide] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    })();
  }, []);
  return (
    <div className="">
      <div className="">
        <header className="fixed inset-0 w-full h-max px-6 bg-foreground border-b border-border z-500">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="p-2 rounded-full hover:bg-muted-light"
                onClick={() => setOpenSide(true)}
              >
                <LuMenu size={24} />
              </button>
              <div className="ml-2 font-light tracking-widest text-2xl text-transparent bg-linear-to-l from-brand-light via-brand to-brand-dark bg-clip-text">
                Form
              </div>
            </div>
            <HeaderProfile {...{ user }} />
          </div>
        </header>
        <aside
          className={`${!openSide && "-translate-x-full"} duration-300 fixed inset-0 z-1000 w-64 h-screen flex flex-col bg-foreground border-r border-border`}
        >
          <div className="sticky top-0 h-screen">
            <div className="h-20 px-2 flex items-center justify-between">
              <div className="flex items-center">
                <img src="/fluens.png" className="w-16" />
                <div className="font-light tracking-widest text-2xl text-transparent bg-linear-to-l from-brand-light via-brand to-brand-dark bg-clip-text">
                  Form
                </div>
              </div>
            </div>
            <div className="w-full flex-1 overflow-auto">
              <div className="w-full h-max min-h-screen"></div>
            </div>
          </div>
          
          <button hidden={!openSide} className="absolute top-1/2 left-full -translate-1/2 bg-foreground py-2 rounded-full border border-border hover:bg-muted-light" onClick={() => setOpenSide(false)}>
            <LuChevronLeft size={24} />
          </button>
        </aside>
        {openSide && (
          <div
            className="fixed inset-0 z-999"
            onClick={() => setOpenSide(false)}
          ></div>
        )}
        <div className="">{children}</div>
      </div>
    </div>
  );
}
