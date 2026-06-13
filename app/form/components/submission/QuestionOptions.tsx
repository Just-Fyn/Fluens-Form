"use client";

import { CheckInput } from "@/app/components/ui/inputs";
import OptionLabel from "@/app/components/ui/form/OptionLabel";
import { useFormSubmissionStore } from "@/stores/form-submission-store";
import { SubmissionQuestion } from "@/types/form";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function QuestionOptions(q: SubmissionQuestion) {
  const [openSelect, setOpenSelect] = useState(false);
  const updateAnswers = useFormSubmissionStore((s) => s.updateAnswers);

  return (
    <>
      {(q.type === "radio" || q.type === "checkbox") && (
        <div className="space-y-3">
          {(q.options || []).map((o) => {
            const isSelected = q.answers?.includes(o.id);

            return (
              <OptionLabel
                key={o.id}
                className={`${isSelected ? "bg-brand-light/10 border-brand" : "bg-foreground border-muted hover:border-muted-dark hover:bg-brand-light/10"}`}
              >
                <CheckInput
                  id={o.id}
                  type={q.type}
                  onChange={(e) => {
                    updateAnswers(q.id, o.id, e.target.checked);
                  }}
                  checked={isSelected}
                  name={q.id}
                />
                <span className="flex-1 text-[15px] outline-none resize-none">
                  {o.title}
                </span>
              </OptionLabel>
            );
          })}

          {Boolean(q.answers.length && q.type === "radio") && (
            <button
              type="button"
              className="inline-block mt-2 px-2 py-1 text-sm text-[#64748b] hover:text-brand font-medium transition-colors"
              onClick={() => updateAnswers(q.id, q.answers, false)}
            >
              Hapus jawaban
            </button>
          )}
        </div>
      )}

      {q.type === "select" && (
        <>
          {openSelect && (
            <div
              className="w-screen h-screen fixed inset-0 z-100"
              onClick={() => setOpenSelect(false)}
            ></div>
          )}
          <div
            className={`w-full max-w-sm relative text-[15px] ${openSelect ? "z-110" : ""}`}
          >
            {" "}
            <button
              type="button"
              className={`flex items-center justify-between px-6 w-full h-14.5 border rounded-full transition-all outline-none
                ${openSelect ? "bg-foreground border-brand shadow-[0_0_0_5px_var(--brand)]/12" : "bg-brand-light/10 border-muted hover:border-muted-dark"}
              `}
              onClick={() => setOpenSelect(!openSelect)}
            >
              <span className="text-left truncate">
                {q.options.filter((o) => o.id === q.answers)[0]?.title ||
                  "Pilih opsi..."}
              </span>
              <LuChevronDown className="text-[#64748b]" size={20} />
            </button>
            <div
              hidden={!openSelect || !q.options.length}
              className="absolute mt-2 left-0 w-full bg-foreground border border-muted rounded-3xl shadow-lg p-2 z-50"
            >
              <div className="max-h-64 overflow-auto">
                <div className="w-full flex flex-col gap-1">
                  {q.options?.map((o) => (
                    <button
                      type="button"
                      key={o.id}
                      className="w-full text-left px-5 py-3 rounded-4xl hover:bg-brand-light/10 transition-colors outline-none"
                      onClick={() => {
                        updateAnswers(q.id, o.id);
                        setOpenSelect(false);
                      }}
                    >
                      {o.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {Boolean(q.answers.length) && (
            <button
              type="button"
              className="block mt-3 px-2 py-1 text-sm text-[#64748b] hover:text-brand font-medium transition-colors"
              onClick={() => updateAnswers(q.id, q.answers, false)}
            >
              Hapus jawaban
            </button>
          )}
        </>
      )}
    </>
  );
}
