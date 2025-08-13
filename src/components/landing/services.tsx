
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Image as ImageIcon, SearchCode, Star, ArrowRight, Flame, Bot, Code, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const servicesData = [
  {
    id: "ai-image",
    icon: <ImageIcon className="h-10 w-10 text-accent" />,
    title: "Model Anything",
    description: "Transform your apparel photos. We use custom AI to place your clothing on models, saving you time and money on photoshoots.",
    details: ["₹10 per image", "1-2 day turnaround", "High-quality results"],
    popular: true,
    detailedInfo: {
      shortDescription: "Transform your product/clothes photos into stunning, high-quality visuals with AI — no photoshoots, no hassle. Perfect for sellers who want professional images that sell more.",
      benefits: [
        { title: "Save Time", description: "No more days waiting for edits." },
        { title: "Save Money", description: "No expensive shoots or designers. (AT JUST 10Rs. per CLOTH)" },
        { title: "Unlimited Variations", description: "Backgrounds, styles, themes instantly." },
        { title: "Consistency", description: "Every image matches your brand aesthetic." },
        { title: "Any Product, Any Theme", description: "From minimal white background to luxury lifestyle shots." },
        { title: "Quick Results Delivery", description: "In less than 2 days" }
      ],
      whatWeCanDo: "Turn normal clothes images into high quality realistic images with models wearing them which are ready to use in your market places.",
      pricing: [
        {
          type: "General Images",
          originalPrice: "20",
          discountedPrice: "10",
          description: "Standard apparel images with AI models."
        },
        {
          type: "Custom Images",
          originalPrice: "30",
          discountedPrice: "15",
          description: "Give custom instructions on how you want the images to look exactly."
        }
      ]
    }
  },
  {
    id: "web-scraping",
    icon: <SearchCode className="h-10 w-10 text-accent" />,
    title: "Web Scraping Services",
    description: "Automate data collection from any website. We provide clean, structured, and targeted data for market research, lead generation, and more.",
    details: ["Custom pricing", "WhatsApp & Insta data", "Quality guaranteed"],
    popular: false,
    detailedInfo: {
        shortDescription: "Automate data collection from any website to get the insights you need.",
        benefits: [
            { title: "Accurate Data", description: "Get clean, structured, and reliable data." },
            { title: "Save Time", description: "Automate manual data gathering processes." },
            { title: "Custom Solutions", description: "Scrapers built for your specific needs." },
            { title: "Competitive Pricing", description: "Quality results at cheaper/competitive prices." },
        ],
        whatWeCanDo: "We extract data from websites, APIs, and documents, providing it in a structured format like CSV, JSON, or directly into your database.",
        pricing: [
            {
                type: "Data Extraction",
                priceRange: "1 - 5",
                unit: "data row/lead",
                description: "Pricing varies based on complexity and data source."
            }
        ]
    }
  },
  {
    id: "chatbots",
    icon: <Bot className="h-10 w-10 text-muted-foreground" />,
    title: "Website & Whatsapp Chatbots",
    description: "Integrate AI chatbots into your business, replacing human interaction and automating user engagement 24/7.",
    details: ["Coming Soon"],
    popular: false,
    detailedInfo: {
        shortDescription: "Coming soon: AI-powered chatbots to automate your customer interactions.",
        benefits: [],
        whatWeCanDo: "This service is currently under development. Stay tuned for updates!"
    }
  },
  {
    id: "custom-websites",
    icon: <Code className="h-10 w-10 text-muted-foreground" />,
    title: "Custom Websites",
    description: "We build custom, scalable websites at very low prices.",
    details: ["Coming Soon"],
    popular: false,
    detailedInfo: {
        shortDescription: "Coming soon: Custom, scalable websites built to your specifications.",
        benefits: [],
        whatWeCanDo: "This service is currently under development. Stay tuned for updates!"
    }
  },
  {
    id: "support-agents",
    icon: <Phone className="h-10 w-10 text-muted-foreground" />,
    title: "Customer Support Agents",
    description: "Completely replace your support team with our AI support agents that pick your customer calls and talk, available 24/7.",
    details: ["Coming Soon"],
    popular: false,
    detailedInfo: {
        shortDescription: "Coming soon: AI-powered support agents to handle customer calls 24/7.",
        benefits: [],
        whatWeCanDo: "This service is currently under development. Stay tuned for updates!"
    }
  },
  {
    id: "targeted-marketing",
    icon: <Cpu className="h-10 w-10 text-muted-foreground" />,
    title: "Targeted Marketing Solutions",
    description: "We help you market products online and provide strategic ideas and suggestions on platforms like Instagram, WhatsApp, Facebook, and YouTube.",
    details: ["Coming Soon"],
    popular: false,
    detailedInfo: {
        shortDescription: "Coming soon: Strategic marketing solutions to grow your brand.",
        benefits: [],
        whatWeCanDo: "This service is currently under development. Stay tuned for updates!"
    }
  },
];

export function Services() {
  const [selectedService, setSelectedService] = React.useState<(typeof servicesData)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleKnowMoreClick = (service: (typeof servicesData)[0]) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  }

  return (
    <>
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
          <div className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-6xl lg:grid-cols-3">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                className="h-full opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.15 * (index + 1)}s` }}
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
                  <CardContent className="flex flex-col flex-grow justify-end pt-4">
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.details.map((detail, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted/50 text-muted-foreground">{detail}</Badge>
                      ))}
                    </div>
                    {service.id === 'ai-image' || service.id === 'web-scraping' ? (
                      <Button variant="outline" className="mt-6 w-full transition-transform duration-300 hover:scale-105" onClick={() => handleKnowMoreClick(service)}>
                          Know More
                      </Button>
                    ) : (
                       <Button variant="outline" className="mt-6 w-full" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90dvh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-accent flex items-center gap-4">
                    {selectedService.icon}
                    {selectedService.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-base">
                  {selectedService.detailedInfo.shortDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-8">
                
                {selectedService.detailedInfo.benefits && selectedService.detailedInfo.benefits.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold font-headline mb-4">Core Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedService.detailedInfo.benefits.map((benefit, index) => (
                                <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                                    <p className="font-bold text-foreground">{benefit.title}</p>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {selectedService.detailedInfo.whatWeCanDo && (
                    <div>
                        <h3 className="text-xl font-bold font-headline mb-3">What we can do?</h3>
                        <p className="text-muted-foreground">{selectedService.detailedInfo.whatWeCanDo}</p>
                    </div>
                )}

                {selectedService.detailedInfo.pricing && (
                    <div>
                        <h3 className="text-xl font-bold font-headline mb-4">Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedService.detailedInfo.pricing.map((tier, index) => (
                                <div key={index} className="bg-secondary/50 p-6 rounded-lg border border-accent/20 flex flex-col">
                                    <h4 className="text-lg font-bold text-foreground mb-2">{tier.type}</h4>
                                    {tier.discountedPrice ? (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-3xl font-bold text-accent">₹{tier.discountedPrice}</span>
                                                <span className="text-lg line-through text-muted-foreground">₹{tier.originalPrice}</span>
                                                <span className="text-sm text-muted-foreground">/ image</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-yellow-400 mb-4">
                                                <Flame className="h-5 w-5"/>
                                                <span className="font-bold">50% OFF Right Now!</span>
                                            </div>
                                        </>
                                    ) : tier.priceRange ? (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-3xl font-bold text-accent">₹{tier.priceRange}</span>
                                                <span className="text-sm text-muted-foreground">/ {tier.unit}</span>
                                            </div>
                                             <p className="text-sm text-accent mb-4">Contact us for an exact quote based on your needs.</p>
                                        </>
                                    ) : null}
                                    <p className="text-muted-foreground text-sm flex-grow">{tier.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {selectedService.id === 'ai-image' && (
                  <div>
                    <h3 className="text-xl font-bold font-headline mb-3">Before & After</h3>
                     <div className="grid grid-cols-1 gap-8 rounded-lg overflow-hidden border border-accent/20 p-4 bg-secondary/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Badge variant="outline">Before</Badge>
                          <Image src="/model-anything-example-images/before_img1.jpg" alt="Before AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                        <div className="space-y-2">
                          <Badge variant="default" className="bg-accent text-accent-foreground">After</Badge>
                          <Image src="/model-anything-example-images/after_img1.png" alt="After AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Badge variant="outline">Before</Badge>
                          <Image src="/model-anything-example-images/before_img2.jpg" alt="Before AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                        <div className="space-y-2">
                          <Badge variant="default" className="bg-accent text-accent-foreground">After</Badge>
                          <Image src="/model-anything-example-images/after_img2.png" alt="After AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Badge variant="outline">Before</Badge>
                          <Image src="/model-anything-example-images/before_img3.png" alt="Before AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                        <div className="space-y-2">
                          <Badge variant="default" className="bg-accent text-accent-foreground">After</Badge>
                          <Image src="/model-anything-example-images/after_img3.png" alt="After AI processing" width={500} height={750} className="rounded-lg object-cover aspect-[2/3] border" />
                        </div>
                      </div>
                    </div>  
                  </div>
                )}
                
              </div>
              <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 -m-6 mt-6">
                 <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsDialogOpen(false)}>
                    <Link href="#contact" className="font-semibold">
                        Contact Right Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
