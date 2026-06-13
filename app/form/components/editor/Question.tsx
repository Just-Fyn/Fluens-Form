"use client";

import { useFormEditorStore } from "@/stores/form-editor-store";
import QuestionOptions from "./QuestionOptions";
import QuestionText from "./QuestionText";
import { Question as TQuestion } from "@/types/form";
import { useShallow } from "zustand/react/shallow";
import Textarea from "react-textarea-autosize";
import QuestionSettings from "./QuestionSettings";
import { LuPlus } from "react-icons/lu";
import QuestionCard from "@/app/components/ui/form/QuestionCard";

export default function Question({ qId, qi }: { qId: string; qi: number }) {
  const q = useFormEditorStore((s) =>
    s.form.questions.find((q) => q.id === qId),
  ) as TQuestion;

  const { addQuestion, updateQuestion } = useFormEditorStore(
    useShallow((s) => ({
      addQuestion: s.addQuestion,
      updateQuestion: s.updateQuestion,
    })),
  );
  return (
    <QuestionCard
    >
      <div className="flex justify-between items-start mb-6 gap-4 relative z-80">
        <Textarea
          className="flex-1 text-lg leading-[1.7] font-medium outline-none resize-none"
          defaultValue={q.title}
          onBlur={(e) =>
            updateQuestion(q.id, {
              title: !q.title.trim() ? "Pertanyaan baru" : e.target.value,
            })
          }
        />

        {q.totalScore !== null && (
          <div className="shrink-0 px-4 py-1.5 rounded-full bg-brand-light/10 border border-muted text-sm font-semibold tracking-wide text-muted-darker">
            {Math.round(q.totalScore)} Poin
          </div>
        )}
        <QuestionSettings qId={q.id} />
      </div>

      <div className="relative z-70">
        {q.type === "text" ? (
          <QuestionText {...q} />
        ) : (
          <QuestionOptions {...q} />
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted">
          <div className="text-sm font-medium text-muted-darker">Wajib diisi</div>
          <button
            className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
              q.required ? "bg-brand" : "bg-muted"
            }`}
            onClick={() => updateQuestion(q.id, { required: !q.required })}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-foreground shadow-sm transition-transform duration-300 ${
                q.required ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-60 opacity-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none group-focus-within:pointer-events-auto">
        <button
          type="button"
          className="h-12 w-12 flex items-center justify-center bg-linear-to-br from-brand-light via-brand to-brand-dark text-foreground rounded-full hover:-translate-y-1 shadow-xl transition-all"
          onClick={() => addQuestion(qi + 1)}
        >
          <LuPlus size={24} strokeWidth={2.5} />
        </button>
      </div>
    </QuestionCard>
  );
}
