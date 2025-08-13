"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitInquiry } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  whatsapp: z.string().min(10, {
    message: "Please enter a valid WhatsApp number.",
  }),
  email: z.string().email().optional().or(z.literal('')),
  service: z.enum(["ai-image", "web-scraping", "custom"]),
  customService: z.string().optional(),
}).refine(data => {
    if (data.service === 'custom') {
        return !!data.customService && data.customService.length > 10;
    }
    return true;
}, {
    message: 'Please describe your custom requirement (min. 10 characters).',
    path: ['customService'],
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      whatsapp: "",
      email: "",
      customService: "",
    },
  });

  const selectedService = form.watch("service");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await submitInquiry(values);
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for reaching out. We will get back to you shortly.",
        className: "bg-green-800 text-white border-green-800"
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Company / Business</FormLabel>
                <FormControl>
                    <Input placeholder="Your Company LLC" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 9392628795" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service of Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ai-image">AI Image Service</SelectItem>
                  <SelectItem value="web-scraping">Web Scraping Service</SelectItem>
                  <SelectItem value="custom">Custom Solution</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedService === 'custom' && (
            <FormField
            control={form.control}
            name="customService"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Describe your custom need</FormLabel>
                <FormControl>
                    <Textarea placeholder="Tell us what you're looking for..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        <Button type="submit" size="lg" className="w-full font-bold bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Inquiry
        </Button>
      </form>
    </Form>
  );
}
