import Image from "next/image";
import type { ComponentProps } from "react";

export function Logo(props: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>) {
  // Using next/image to load the logo from the public folder.
  // The 'width' and 'height' are required props for next/image, 
  // but className can be used for responsive sizing.
  return (
    <Image 
      src="/logo.png" 
      alt="Evolv AI Agency Logo"
      width={134}
      height={40}
      {...props}
    />
  );
}

export function Whatsapp(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }
