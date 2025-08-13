import Image from "next/image";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  // Using next/image to load the logo from the public folder.
  // The 'width' and 'height' are required props for next/image, 
  // but className can be used for responsive sizing.
  return (
    <Image 
      src="/logo.svg" 
      alt="Evolv AI Agency Logo"
      width={134}
      height={40}
      {...props}
    />
  );
}
