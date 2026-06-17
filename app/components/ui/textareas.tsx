import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export function PrimaryTextarea(props: TextareaAutosizeProps) {
  return (
    <TextareaAutosize
    {...props}
    className={`w-full p-4 border border-border rounded-3xl outline-none resize-none text-sm transition-[background-color,border-color,box-shadow] focus:bg-foreground focus:border-brand focus:shadow-[0_0_0_5px_var(--brand)]/12 scrollbar-hidden ${props.className}`}
      maxRows={6}
    />
  );
}
