import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Image, SearchCode, Star } from "lucide-react";

const services = [
  {
    icon: <Image className="h-10 w-10 text-accent" />,
    title: "AI Image Services",
    description: "Transform your apparel photos. We use custom AI to place your clothing on models, saving you time and money on photoshoots.",
    details: ["₹10 per image", "1-2 day turnaround", "High-quality results"],
    popular: true,
  },
  {
    icon: <SearchCode className="h-10 w-10 text-accent" />,
    title: "Web Scraping Services",
    description: "Automate data collection from any website. We provide clean, structured, and targeted data for market research, lead generation, and more.",
    details: ["Custom pricing", "WhatsApp & Insta data", "Quality guaranteed"],
    popular: false,
  },
  {
    icon: <Cpu className="h-10 w-10 text-muted-foreground" />,
    title: "Targeted Marketing Solutions",
    description: "We help you market products online and provide strategic ideas and suggestions for platforms like Instagram and WhatsApp.",
    details: ["Coming Soon"],
    popular: false,
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-[#121212]">
      <div className="container mx-auto space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center opacity-0 animate-fade-in-up">
          <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            Our Services
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
            AI-Powered Solutions for Growth
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We offer a range of specialized AI services designed to give your business a competitive edge.
          </p>
        </div>
        <div className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="h-full opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <Card className="h-full flex flex-col border-accent/20 transition-all duration-300 hover:shadow-accent/10 hover:shadow-lg hover:-translate-y-2 hover:border-accent">
                <CardHeader className="pb-4 relative">
                  {service.popular && (
                    <Badge variant="default" className="absolute top-4 right-4 bg-accent text-accent-foreground flex items-center gap-1">
                      <Star className="h-3 w-3" /> Popular
                    </Badge>
                  )}
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                  <CardDescription className="pt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-end">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.details.map((detail, i) => (
                      <Badge key={i} variant="secondary" className="bg-muted/50 text-muted-foreground">{detail}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
