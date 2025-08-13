import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="w-full py-24 md:py-32 lg:py-48 xl:py-56">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="max-w-4xl opacity-0 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              Skip the Old Way.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-green-400 to-primary">
                Evolv the New Way.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              Evolv empowers businesses and startups with <strong>cutting-edge AI and Automation technologies</strong>. We blend smart technology with creative execution to help brands skip the old way and embrace the future.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105">
              <Link href="#contact" className="font-semibold">
                Lets Build Together!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105">
              <Link href="#services" className="font-semibold">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
