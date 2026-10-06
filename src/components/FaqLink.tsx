import { ReactNode } from "react";
import { goToFaq, scrollToSection } from "@/components/SmoothScroll";

/**
 * Small "(?)" link that jumps straight to a FAQ question (opens + highlights it),
 * or, with `section`, to a page section such as the pricing.
 */
export default function FaqLink({
  id,
  section,
  children,
  className = "",
}: {
  id?: string;
  section?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={section ? `#${section}` : `#faq-${id}`}
      onClick={(e) => {
        e.preventDefault();
        if (section) scrollToSection(section);
        else if (id) goToFaq(id);
      }}
      aria-label={children ? undefined : section ? "Voir les formules et les tarifs" : "Voir la réponse"}
      title={children ? undefined : section ? "Voir les tarifs" : "Voir la réponse"}
      className={`group inline-flex items-center gap-2 font-['Rubik'] text-foreground/70 hover:text-orange transition-colors ${className}`}
    >
      <span className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full border border-current text-[10px] md:text-xs font-medium transition-transform group-hover:rotate-12">
        ?
      </span>
      {children && <span className="underline decoration-dotted underline-offset-4">{children}</span>}
    </a>
  );
}
