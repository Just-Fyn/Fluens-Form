"use client";

import { SubmissionQuestion } from "@/types/form";
import { PrimaryTextarea } from "@/app/components/ui/textareas";

export default function QuestionText(q: SubmissionQuestion) {
  return (
    <div className="relative">
      <PrimaryTextarea
        value={q.answers as string}
        readOnly
      />
    </div>
  );
}