"use client";

import { CheckInput } from "@/app/components/ui/inputs";
import { useFormSubmissionStore } from "@/stores/form-submission-store";
import { SubmissionQuestion } from "@/types/form";
import { useState } from "react";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";

export default function QuestionOptions(q: SubmissionQuestion) {
  const [openSelect, setOpenSelect] = useState(false);
  const updateAnswers = useFormSubmissionStore((s) => s.updateAnswers);

  return (
    <>
      {(q.type === "radio" || q.type === "checkbox") && (
        <div className="space-y-3">
          {(q.options || []).map((o, oi) => {
            const isSelected = q.answers?.includes(o.id);
            const isCorrect = q.correctAnswers?.includes(o.id);
            const isWrong = !isCorrect && isSelected;

            return (
              <label 
                key={o.id} 
                htmlFor={o.id}
                className={`relative flex items-center gap-4 p-4 rounded-3xl border border-muted bg-foreground transition-all 
                  ${isSelected ? "bg-brand-light/10 border-brand" : "hover:border-muted-dark"} 
                  ${isWrong ? "border-red-200! bg-red-50/50!" : ""} 
                  ${isCorrect && isSelected ? "border-green-200 bg-green-50/50!" : ""}
                `}
              >
                <CheckInput
                  id={o.id}
                  type={q.type}
                  className="pointer-events-none"
                  checked={isSelected}
                  name={q.id}
                  readOnly
                />

                <span className="flex-1 text-sm outline-none resize-none">
                  {o.title}
                </span>

                {isWrong && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600">
                    <LuX strokeWidth={3} size={14} />
                  </span>
                )}
                {isCorrect && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <LuCheck strokeWidth={3} size={14} />
                  </span>
                )}
              </label>
            );
          })}
        </div>
      )}

      {q.type === "select" && (
        <>
          {openSelect && (
            <div
              className="w-screen h-screen fixed inset-0 z-40"
              onClick={() => setOpenSelect(false)}
            ></div>
          )}
          <div className={`w-full max-w-sm relative text-sm ${openSelect ? "z-50" : ""}`}>
            <button
              type="button"
              className={`flex items-center justify-between px-6 w-full h-14.5 border border-muted rounded-full cursor-default bg-brand-light/10 transition-all outline-none
                ${openSelect ? "bg-foreground border-brand shadow-[0_0_0_5px_var(--brand)]/12" : ""}
              `}
            >
              <span className="text-left truncate">
                {q.options.filter((o) => o.id === q.answers)[0]?.title || <span className="opacity-50">Tidak dijawab</span>}
              </span>
              <LuChevronDown className="text-muted-darker" size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
}