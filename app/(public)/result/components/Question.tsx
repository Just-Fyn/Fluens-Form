"use client";

import QuestionCard from "@/app/components/ui/form/QuestionCard";
import QuestionOptions from "./QuestionOptions";
import QuestionText from "./QuestionText";
import { SubmissionQuestion } from "@/types/form";

export default function Question({ q }: { q: SubmissionQuestion }) {
  return (
    <QuestionCard>
      <div className="flex justify-between items-start mb-6 gap-4 relative z-10">
        <div className="text-lg leading-[1.7] font-medium outline-none resize-none">
          {q.title}
          {q.required && <span className="text-red-500 ml-1.5">*</span>}
        </div>
        
        {q.score !== null && (
          <div className="shrink-0 px-4 py-1.5 rounded-full bg-brand-light/10 border border-border text-sm font-semibold tracking-wide text-muted-darker">
            {Math.round(q.score)}/{q.totalScore} Poin
          </div>
        )}
      </div>

      <div className="relative z-10">
        {q.type === "text" ? (
          <QuestionText {...q} />
        ) : (
          <QuestionOptions {...q} />
        )}
      </div>
    </QuestionCard>
  );
}