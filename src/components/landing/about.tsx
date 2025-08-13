import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              About Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              The Minds Behind the Magic
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Evolv AI is a collective of developers, data scientists, and creative thinkers passionate about leveraging artificial intelligence to solve real-world problems. We believe in a collaborative approach, working closely with our clients to build innovative and impactful solutions.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our mission is to democratize AI, making powerful technologies accessible to businesses of all sizes. We're dedicated to pushing boundaries and evolving with the ever-changing landscape of technology.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden rounded-xl shadow-2xl w-full max-w-md">
              <Image
                src="https://placehold.co/600x600.png"
                width={600}
                height={600}
                alt="Evolv AI Team"
                data-ai-hint="team business"
                className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
