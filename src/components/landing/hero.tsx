import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              Amplify Your Vision with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                Evolv AI
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              From stunning AI-generated visuals to intelligent web scraping, we provide the custom AI solutions your business needs to innovate and excel.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Button asChild size="lg">
              <Link href="#contact" className="font-semibold">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
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
