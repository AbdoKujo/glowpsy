import { ReactNode } from "react";
import { goToFaq } from "@/components/SmoothScroll";

/** Small "(?)" link that jumps straight to a FAQ question, opens it and highlights it. */
export default function FaqLink({ id, children, className = "" }: { id: string; children?: ReactNode; className?: string }) {
  return (
    <a
      href={`#faq-${id}`}
      onClick={(e) => {
        e.preventDefault();
        goToFaq(id);
      }}
      className={`group inline-flex items-center gap-2 font-['Rubik'] text-foreground/70 hover:text-orange transition-colors ${className}`}
    >
      <span className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full border border-current text-[10px] md:text-xs font-medium transition-transform group-hover:rotate-12">
        ?
      </span>
      {children && <span className="underline decoration-dotted underline-offset-4">{children}</span>}
    </a>
  );
}
