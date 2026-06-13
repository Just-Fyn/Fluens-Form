import { InputHTMLAttributes } from "react";

export function CheckInput(props: InputProps) {
  return (
    <input
      {...props}
      className="w-5 h-5 accent-brand border-muted cursor-pointer"
    />
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface CheckInputProps extends Omit<InputProps, "type"> {
  type: "radio" | "checkbox";
}
