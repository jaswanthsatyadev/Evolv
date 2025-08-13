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
