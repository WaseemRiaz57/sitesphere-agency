"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/app/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-line", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-[-0.015em] text-ink transition-colors hover:text-cobalt sm:text-xl",
          className
        )}
        {...props}
      >
        {children}
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[background-color,border-color,color] duration-200 group-hover:border-cobalt group-data-[state=open]:border-cobalt group-data-[state=open]:bg-cobalt group-data-[state=open]:text-paper">
          <Plus
            className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-data-[state=open]:rotate-45"
            aria-hidden="true"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_220ms_ease-out] data-[state=open]:animate-[accordion-down_260ms_var(--ease-out-soft)]"
      {...props}
    >
      <div className={cn("max-w-[62ch] pb-7 text-ink-soft", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
