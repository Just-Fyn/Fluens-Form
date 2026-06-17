import { HTMLAttributes } from "react";

export default function QuestionCard(props: QuestionCardProps) {
  return (
    <div
      {...props}
      className="relative bg-foreground border border-border rounded-4xl p-8 shadow-lg transition-all hover:shadow-xl group focus-within:z-50"
      tabIndex={1}
    />
  );
}

export interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {}
