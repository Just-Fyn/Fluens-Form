import React, { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export default function OptionLabel(
  props: LabelProps,
  
) {
  return (
    <label
      {...props}
      className={`relative flex items-center gap-4 p-4 rounded-3xl border transition-all cursor-pointer group ${props.className}`}
    />
  );
}

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>
