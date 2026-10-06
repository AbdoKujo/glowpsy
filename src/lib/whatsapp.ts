import { contact } from "@/data/pitch-data";

/** wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
