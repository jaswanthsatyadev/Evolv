import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-8 bg-secondary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-semibold font-headline">Evolv AI</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Evolv AI Agency. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#services"
            className="text-sm hover:underline underline-offset-4 text-muted-foreground"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm hover:underline underline-offset-4 text-muted-foreground"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm hover:underline underline-offset-4 text-muted-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
