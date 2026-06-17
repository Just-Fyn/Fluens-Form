"use client";

import { SubmissionQuestion } from "@/types/form";
import { PrimaryTextarea } from "@/app/components/ui/textareas";

export default function QuestionText(q: SubmissionQuestion) {
  return (
    <div className="relative">
      <PrimaryTextarea
        className="pointer-events-none"
        value={q.answers as string}
        readOnly
      />
    </div>
  );
}