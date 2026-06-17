import { formatTimestamp } from "@/helpers/timestamp-formatter";
import { Form } from "@/types/form";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { FaFile, FaGripLines, FaThList, FaWpforms } from "react-icons/fa";
import { LuEllipsisVertical } from "react-icons/lu";

export default function FormCard({
  title,
  shareToken,
  createdAt,
  updatedAt,
  highlight,
  deleteForm,
}: Partial<Form> & {
  highlight?: string;
  deleteForm: (shareToken: string) => void;
}) {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const formattedCreated = createdAt ? formatTimestamp(createdAt) : "-";
  const formattedUpdated = updatedAt ? formatTimestamp(updatedAt) : "-";

  const renderTitle = () => {
    if (!title) return "-";
    if (!highlight) return title;

    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    const parts = title.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="text-brand bg-transparent">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="aspect-3/4 p-4 sm:p-6 min-h-full bg-foreground rounded-3xl border border-border flex flex-col relative">
      <div className="flex-1 grid place-content-center relative">
        <div className="relative min-[400px]:scale-150 min-[500px]:scale-175 sm:scale-200">
          <FaThList className="text-brand w-12 h-12" />
          <div className="w-max h-4 absolute inset-0 overflow-hidden flex items-start">
            <FaThList className="text-brand-light w-12 h-12" />
          </div>
          <div className="w-max h-4 absolute bottom-0 overflow-hidden flex items-end">
            <FaThList className="text-brand-dark w-12 h-12" />
          </div>
        </div>
      </div>
      <div className="relative border-t border-border pt-4">
        <div className="space-y-1">
          <div className="font-medium line-clamp-1">{renderTitle()}</div>
          <div>
            <div className="text-xs text-muted-darker/50">Dibuat :</div>
            <div className="text-xs text-muted-darker/60">
              {formattedCreated}
            </div>
          </div>{" "}
          <div>
            <div className="text-xs text-muted-darker/50">
              Terakhir diperbarui :
            </div>
            <div className="text-xs text-muted-darker/60">
              {formattedUpdated}
            </div>
          </div>
        </div>
      </div>
      <a
        className="absolute w-full h-full inset-0 opacity-0"
        href={`/app/form/${shareToken}/edit`}
      />
      <div className="flex absolute bottom-3 right-0 sm:bottom-4 sm:right-4">
        {openOptions && (
          <div
            className="fixed inset-0 z-99"
            onClick={() => setOpenOptions(false)}
          ></div>
        )}

        {openOptions && (
          <div className="absolute bottom-full right-0 mt-2 min-w-50 w-max bg-foreground z-100 border border-border shadow-lg rounded-3xl p-2">
            <div className="flex flex-col gap-1 relative">
              <a
                className="w-full px-4 h-11 flex items-center gap-2 rounded-full text-sm font-medium text-brand hover:bg-brand-light/10 transition-colors"
                href={`/app/form/${shareToken}/edit`}
              >
                Edit
              </a>
              <a
                className="px-4 h-11 flex items-center gap-3 rounded-full text-sm font-medium hover:bg-brand-light/10 transition-colors"
                href={`${window.origin}/f/${shareToken}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di tab baru
              </a>
              <button
                className="px-4 h-11 flex items-center gap-3 rounded-full text-sm font-medium hover:bg-brand-light/10 transition-colors"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.origin}/f/${shareToken}`,
                  )
                }
              >
                Salin link
              </button>
              <button
                className="w-full px-4 h-11 flex items-center gap-3 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => deleteForm(shareToken!)}
              >
                Hapus
              </button>
            </div>
          </div>
        )}

        <button
          className={`p-2 rounded-full hover:bg-muted-light z-1 ${openOptions && "z-99"}`}
          onClick={() => setOpenOptions(!openOptions)}
        >
          <LuEllipsisVertical size={20} />
        </button>
      </div>
    </div>
  );
}

export function SkeletonFormCard({className}:{className?:string}) {
  return (
    <div className={`aspect-3/4 p-6 min-h-full bg-foreground rounded-3xl border border-border flex flex-col relative max-[400px]:text-[11px] ${className}`}>
      <div className="flex-1 grid place-content-center relative">
        <div className="relative min-[400px]:scale-150 min-[500px]:scale-175 sm:scale-200 animate-pulse">
          <FaThList className="text-muted w-12 h-12" />
          <div className="w-max h-4 absolute inset-0 overflow-hidden flex items-start">
            <FaThList className="text-muted-light w-12 h-12" />
          </div>
          <div className="w-max h-4 absolute bottom-0 overflow-hidden flex items-end">
            <FaThList className="text-muted-dark w-12 h-12" />
          </div>
        </div>
      </div>
      <div className="relative border-t border-border pt-4 animate-pulse">
        <div className="space-y-1">
          <div className="font-medium line-clamp-1 h-6 bg-muted-light rounded-md mb-2"></div>
          <div className="mb-2">
            <div className="h-3 w-16 bg-muted-light rounded mb-1"></div>
            <div className="h-3 w-32 bg-muted-light rounded"></div>
          </div>
          <div>
            <div className="h-3 w-32 bg-muted-light rounded mb-1"></div>
            <div className="h-3 w-24 bg-muted-light rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
