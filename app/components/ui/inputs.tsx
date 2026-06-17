import { InputHTMLAttributes } from "react";

export function CheckInput(props: CheckInputProps) {
  return (
    <input
      {...props}
      className="w-5 h-5 accent-brand border-border cursor-pointer"
    />
  );
}

export function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className={`w-full p-4 border border-border rounded-3xl outline-none resize-none text-sm transition-[border-color,box-shadow] focus:bg-foreground focus:border-brand focus:shadow-[0_0_0_5px_var(--brand)]/12 ${props.className}`}
    />
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface CheckInputProps extends Omit<InputProps, "type"> {
  type: "radio" | "checkbox";
}

export interface TextInputProps extends Omit<InputProps, "type"> {
  type: "text" | "email" | "password";
}
