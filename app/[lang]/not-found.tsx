import Link from "next/link";
import { FlowerMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-6 pt-32 text-center">
      <FlowerMark className="h-10 w-10 text-wine" />
      <p className="display mt-8 text-6xl">404</p>
      <Link href="/" className="btn-line mt-10">
        Flower Story
      </Link>
    </div>
  );
}
