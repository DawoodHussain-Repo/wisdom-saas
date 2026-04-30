import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] mt-auto py-12 px-14 max-sm:px-4 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <Image src="/images/logo.svg" alt="Converso" width={46} height={44} />
            </div>
          </Link>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
            Personalized AI voice companions to help you master any subject. Real-time interactive sessions for Maths, Science, Coding, History and more.
          </p>
        </div>

        <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Product</h3>
            <Link href="/companions" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              Library
            </Link>
            <Link href="/#how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              How it Works
            </Link>
            <Link href="/#pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              Pricing
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Legal</h3>
            <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-12 pt-6 border-t border-[var(--color-border)] text-sm text-[var(--color-text-muted)] flex justify-between items-center max-sm:flex-col gap-4">
        <p>&copy; {new Date().getFullYear()} Converso. All rights reserved.</p>
      </div>
    </footer>
  );
}
