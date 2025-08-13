import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Bot, SearchCode } from "lucide-react";

const aiImageSteps = [
  {
    title: "1. Consultation & Concept",
    description: "We start by understanding your vision, brand, and the specific requirements for your images.",
  },
  {
    title: "2. Prompt Engineering & Iteration",
    description: "Our experts craft detailed prompts and work with you through iterations to refine the visual style.",
  },
  {
    title: "3. AI Generation & Curation",
    description: "We generate a diverse set of images and curate the best options that align with your goals.",
  },
  {
    title: "4. Final Delivery & Upscaling",
    description: "You receive the final, high-resolution images, ready for use in your projects.",
  },
];

const webScrapingSteps = [
  {
    title: "1. Discovery & Scoping",
    description: "We identify your data requirements and analyze the target websites to plan the scraping strategy.",
  },
  {
    title: "2. Custom Scraper Development",
    description: "Our team builds a robust, custom scraper designed to handle the specific structure of the target sites.",
  },
  {
    title: "3. Data Extraction & Cleaning",
    description: "We execute the scrape, then clean, structure, and validate the collected data for accuracy.",
  },
  {
    title: "4. Secure Data Delivery",
    description: "The final, clean dataset is delivered to you securely in your preferred format (CSV, JSON, API, etc.).",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Our Streamlined Process
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We follow a structured and transparent process to ensure quality and efficiency from start to finish.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <Tabs defaultValue="ai-image" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai-image">
                <Bot className="mr-2 h-4 w-4" /> AI Image Service
              </TabsTrigger>
              <TabsTrigger value="web-scraping">
                <SearchCode className="mr-2 h-4 w-4" /> Web Scraping Service
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ai-image">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    {aiImageSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="web-scraping">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    {webScrapingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
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
