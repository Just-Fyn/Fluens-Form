import { ButtonHTMLAttributes } from "react";

export function PrimaryBtn(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-14 px-8 bg-linear-to-br from-brand-light via-brand to-brand-dark text-foreground rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none ${props.className}`}
    />
  );
}

export function SecondaryBtn(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-14 px-8 bg-foreground border border-muted rounded-full font-semibold transition-all hover:border-brand hover:text-brand hover:-translate-y-px shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none ${props.className}`}
    />
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
