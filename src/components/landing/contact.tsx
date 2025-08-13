import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContactForm } from "./contact-form";
import { Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium">
                Contact Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-accent-foreground">
                Let&apos;s Build Together
            </h2>
            <p className="max-w-md text-muted-foreground md:text-lg/relaxed">
                Have a project in mind? Fill out the form or reach out via WhatsApp or email. We&apos;ll get back to you to discuss how we can help you evolve.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a href="https://wa.me/919392628795" target="_blank" className="text-lg text-muted-foreground hover:text-accent-foreground transition-colors">+91 9392628795</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:jaswanthjuluru55@gmail.com" className="text-lg text-muted-foreground hover:text-accent-foreground transition-colors">jaswanthjuluru55@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-accent/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Inquiry Form</CardTitle>
                    <CardDescription>Tell us a bit about your needs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
