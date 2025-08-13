import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Bot, SearchCode, Milestone } from "lucide-react";

const aiImageSteps = [
  {
    icon: <Milestone className="mt-1 h-8 w-8 flex-shrink-0 text-accent" />,
    title: "1. You give us your apparel images",
    description: "Simply provide the photos of the clothes you want to feature. We'll handle the rest.",
  },
  {
    icon: <Milestone className="mt-1 h-8 w-8 flex-shrink-0 text-accent" />,
    title: "2. We work our AI magic (1-2 days)",
    description: "Our fine-tuned AI models generate realistic photos of models wearing your apparel.",
  },
  {
    icon: <CheckCircle className="mt-1 h-8 w-8 flex-shrink-0 text-green-500" />,
    title: "3. We deliver stunning, realistic photos",
    description: "You receive high-quality, market-ready images to use on your e-commerce site and social media.",
  },
];

const webScrapingSteps = [
  {
    icon: <Milestone className="mt-1 h-8 w-8 flex-shrink-0 text-accent" />,
    title: "1. Tell us your data needs",
    description: "Let us know what kind of data you need, its purpose, and any specific filters or sources.",
  },
  {
    icon: <Milestone className="mt-1 h-8 w-8 flex-shrink-0 text-accent" />,
    title: "2. We build & deploy our scrapers (1-2 days)",
    description: "Our team develops and runs automated solutions to gather the exact data you requested.",
  },
  {
    icon: <CheckCircle className="mt-1 h-8 w-8 flex-shrink-0 text-green-500" />,
    title: "3. You get clean, structured data",
    description: "We deliver the final, quality-checked dataset in your preferred format, ready for analysis.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center opacity-0 animate-fade-in-up">
          <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
            Our Streamlined Process
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We follow a structured and transparent process to ensure quality and efficiency from start to finish.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Tabs defaultValue="ai-image" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="ai-image" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Bot className="mr-2 h-4 w-4" /> AI Image Service
              </TabsTrigger>
              <TabsTrigger value="web-scraping" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <SearchCode className="mr-2 h-4 w-4" /> Web Scraping Service
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ai-image" className="opacity-0 animate-fade-in">
              <Card className="border-accent/20">
                <CardContent className="p-8">
                  <div className="grid gap-8">
                    {aiImageSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-6">
                        {step.icon}
                        <div>
                          <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="web-scraping" className="opacity-0 animate-fade-in">
              <Card className="border-accent/20">
                <CardContent className="p-8">
                <div className="grid gap-8">
                    {webScrapingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-6">
                        {step.icon}
                        <div>
                          <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
