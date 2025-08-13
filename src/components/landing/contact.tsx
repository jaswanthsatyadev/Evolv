import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                Contact Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mt-2">
                Let&apos;s Build Together
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Have a project in mind? Fill out the form below and we&apos;ll get back to you to discuss how we can help.
            </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
            <Card>
                <CardHeader>
                    <CardTitle>Inquiry Form</CardTitle>
                    <CardDescription>Tell us a bit about your needs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
