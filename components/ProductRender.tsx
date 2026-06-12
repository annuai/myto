import React from "react";

type Size = "sm" | "md" | "lg" | "xl";

interface ProductRenderProps {
  name: string;
  size?: Size;
  className?: string;
}

const sizeMap: Record<Size, { container: string; circle: string; text: string }> = {
  sm: {
    container: "h-32 w-32",
    circle: "h-24 w-24 border-dashed border border-[rgba(0,0,0,0.15)]",
    text: "text-xs",
  },
  md: {
    container: "h-48 w-48",
    circle: "h-36 w-36 border-dashed border border-[rgba(0,0,0,0.15)]",
    text: "text-sm",
  },
  lg: {
    container: "h-64 w-64",
    circle: "h-52 w-52 border-dashed border-2 border-[rgba(0,0,0,0.12)]",
    text: "text-base",
  },
  xl: {
    container: "h-96 w-96",
    circle: "h-80 w-80 border-dashed border-2 border-[rgba(0,0,0,0.10)]",
    text: "text-lg",
  },
};

export function ProductRender({ name, size = "md", className = "" }: ProductRenderProps) {
  const s = sizeMap[size];
  return (
    <div
      className={`flex items-center justify-center ${s.container} ${className}`}
      aria-label={`Product render placeholder for ${name}`}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-full ${s.circle}`}
        style={{ background: "rgba(0,0,0,0.03)" }}
      >
        <span
          className={`${s.text} font-medium text-center px-4 leading-tight`}
          style={{ color: "var(--color-muted)", maxWidth: "90%" }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
