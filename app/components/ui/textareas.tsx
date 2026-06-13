import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export function PrimaryTextarea(props: TextareaAutosizeProps) {
  return (
    <TextareaAutosize
      className="w-full p-5 border border-muted rounded-3xl outline-none resize-none text-[15px] bg-brand-light/10 transition-[background-color,border-color,box-shadow] focus:bg-foreground focus:border-brand focus:shadow-[0_0_0_5px_var(--brand)]/12 scrollbar-hidden"
      {...props}
      maxRows={6}
    />
  );
}
