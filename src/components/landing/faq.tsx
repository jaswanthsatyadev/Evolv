import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "What is Evolv about?",
      answer: "Evolv is an AI-powered solutions company helping businesses automate, optimize, and grow faster."
    },
    {
      question: "Who can use your services?",
      answer: "Startups, businesses, enterprises, and individuals looking to scale with AI automation."
    },
    {
      question: "Do I need technical knowledge to work with you?",
      answer: "Nope. We handle the tech so you can focus on your business."
    },
    {
      question: "How quickly can I get results?",
      answer: "Many clients see efficiency gains within days; larger projects may take a few more days."
    },
    {
      question: "Do you offer custom AI solutions?",
      answer: "Yes — we tailor every solution to fit your exact needs and workflows."
    },
    {
      question: "What industries do you serve?",
      answer: "E-commerce, education, finance, healthcare, real estate, manufacturing, and more."
    },
    {
      question: "What’s the pricing model?",
      answer: "Transparent and competitive pricing based on project complexity, automation depth, and scale."
    },
    {
      question: "Can you integrate with my existing tools?",
      answer: "Absolutely. We can connect with CRMs, ERPs, APIs, and custom platforms."
    },
    {
      question: "Is my data safe with you?",
      answer: "Yes — we follow strict security and compliance measures to keep your data protected."
    },
    {
      question: "How do I get started?",
      answer: "Book a free consultation or drop us a message — we’ll guide you from there."
    }
  ];
  
  export function Faq() {
    return (
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center opacity-0 animate-fade-in-up">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              FAQs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? We've got answers. Here are some of the most common questions we get.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl w-full opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-accent/20">
                  <AccordionTrigger className="text-lg font-medium text-left hover:no-underline text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground data-[state=open]:animate-fade-in">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }
  
