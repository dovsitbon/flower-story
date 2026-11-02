import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/order";

export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed end-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-[0_6px_24px_rgba(42,34,36,0.18)] transition-colors duration-500 hover:bg-wine md:end-8 md:bottom-8"
    >
      <WhatsAppIcon />
    </a>
  );
}
