
import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-8 bg-secondary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="text-sm text-muted-foreground text-center md:text-left">
          <Link href="/admin" className="cursor-pointer hover:text-accent-foreground transition-colors">
            &copy; {new Date().getFullYear()} Evolv AI Agency. All rights reserved. 
          </Link>
          <br/> Founded in Hyderabad, India by Jaswanth Satya Dev.
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#services"
            className="text-sm hover:text-accent underline-offset-4 text-muted-foreground transition-colors"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm hover:text-accent underline-offset-4 text-muted-foreground transition-colors"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm hover:text-accent underline-offset-4 text-muted-foreground transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
           <Link
            href="#faq"
            className="text-sm hover:text-accent underline-offset-4 text-muted-foreground transition-colors"
            prefetch={false}
          >
            FAQs
          </Link>
        </nav>
      </div>
    </footer>
  );
}
