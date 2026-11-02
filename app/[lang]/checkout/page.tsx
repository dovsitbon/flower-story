import type { Metadata } from "next";
import { getDict, isLocale } from "@/lib/i18n";
import { CheckoutForm } from "@/components/CheckoutForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/checkout">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: { absolute: getDict(lang).meta.checkoutTitle }, robots: { index: false, follow: false } };
}

export default function CheckoutPage() {
  return (
    <div className="px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
      <CheckoutForm />
    </div>
  );
}
