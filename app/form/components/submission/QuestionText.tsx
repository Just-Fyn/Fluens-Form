"use client";

import { PrimaryTextarea } from "@/app/components/ui/textareas";
import { useFormSubmissionStore } from "@/stores/form-submission-store";
import { SubmissionQuestion } from "@/types/form";

export default function QuestionText(q: SubmissionQuestion) {
  const updateAnswers = useFormSubmissionStore((s) => s.updateAnswers);

  return (
    <div className="relative">
      <PrimaryTextarea
        defaultValue={q.answers as string}
        placeholder="Ketik jawaban Anda di sini..."
        onBlur={(e) => updateAnswers(q.id, e.target.value)}
      />
    </div>
  );
}