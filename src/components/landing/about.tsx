import Image from "next/image";
import { Card } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6 opacity-0 animate-fade-in-up">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium">
              About Evolv
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-foreground leading-tight">
              Why Evolv? Why Now?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              In a world saturated with repetitive solutions, Evolv was born from a desire to truly innovate. We saw businesses struggle with outdated, inefficient processes and knew that AI and automation held the key to unlocking unprecedented growth. We are not just service providers; we are strategic partners dedicated to transforming your operational landscape.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              Founded in Hyderabad, India, by Jaswanth Satya Dev, our mission is to fuse cutting-edge technology with creative intelligence. We aim to build bespoke, powerful AI solutions that are not only effective but also accessible, giving you the competitive edge you need to thrive in the digital age.
            </p>
          </div>
          <div className="flex items-center justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="overflow-hidden rounded-xl shadow-2xl w-full max-w-md border-accent/20">
              <Image
                src="https://placehold.co/600x600.png"
                width={600}
                height={600}
                alt="Founder Jaswanth Satya Dev"
                data-ai-hint="founder portrait"
                className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
