import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Image, SearchCode } from "lucide-react";

const services = [
  {
    icon: <Image className="h-8 w-8 text-primary" />,
    title: "AI Image Services",
    description: "Generate stunning, unique, and high-quality images for marketing, design, and content. From concept art to product mockups, let AI bring your ideas to life.",
    details: ["Pricing: Starts at $150/project", "Turnaround: 2-4 business days"],
  },
  {
    icon: <SearchCode className="h-8 w-8 text-primary" />,
    title: "Web Scraping Services",
    description: "Automate data collection from any website. We provide clean, structured, and reliable data for market research, lead generation, and competitive analysis.",
    details: ["Billed Hourly or Per Project", "Includes Data Cleaning"],
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Custom AI Solutions",
    description: "Have a unique challenge? We build bespoke AI models and applications tailored to your specific business needs, from natural language processing to predictive analytics.",
    details: ["Free Initial Consultation", "Scalable & Secure Architecture"],
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Our Services
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            AI-Powered Solutions for Growth
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We offer a range of specialized AI services designed to give your business a competitive edge.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.details.map((detail, i) => (
                    <Badge key={i} variant="secondary">{detail}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
