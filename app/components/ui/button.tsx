import { cn } from "@/app/lib/utils";

type Variant = "primary" | "secondary" | "inverse" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-cobalt text-paper shadow-press hover:bg-cobalt-deep active:translate-y-px",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-marigold",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props} />
  );
}

type LinkButtonProps = React.ComponentProps<"a"> & {
  variant?: Variant;
  size?: Size;
};

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <a className={buttonClasses({ variant, size, className })} {...props} />;
}
