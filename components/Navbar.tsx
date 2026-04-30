import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="Converso" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-accent)] transition-colors duration-200 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 border-2 border-transparent hover:border-[var(--color-accent)] transition-all",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
