
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
  countryCode: z.string(),
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

const countryCodes = [
    { value: "+91", label: "IN (+91)" },
    { value: "+1", label: "US (+1)" },
    { value: "+1", label: "CA (+1)" },
    { value: "+44", label: "UK (+44)" },
    { value: "+61", label: "AU (+61)" },
    { value: "+64", label: "NZ (+64)" },
    { value: "+49", label: "DE (+49)" },
    { value: "+33", label: "FR (+33)" },
    { value: "+39", label: "IT (+39)" },
    { value: "+34", label: "ES (+34)" },
    { value: "+31", label: "NL (+31)" },
    { value: "+46", label: "SE (+46)" },
    { value: "+47", label: "NO (+47)" },
    { value: "+45", label: "DK (+45)" },
    { value: "+41", label: "CH (+41)" },
    { value: "+65", label: "SG (+65)" },
    { value: "+81", label: "JP (+81)" },
    { value: "+82", label: "KR (+82)" },
    { value: "+971", label: "AE (+971)" },
    { value: "+972", label: "IL (+972)" },
    { value: "+62", label: "ID (+62)" },
    { value: "+60", label: "MY (+60)" },
    { value: "+63", label: "PH (+63)" },
    { value: "+66", label: "TH (+66)" },
    { value: "+84", label: "VN (+84)" },
    { value: "+92", label: "PK (+92)" },
    { value: "+880", label: "BD (+880)" },
    { value: "+27", label: "ZA (+27)" },
    { value: "+234", label: "NG (+234)" },
    { value: "+254", label: "KE (+254)" },
    { value: "+55", label: "BR (+55)" },
    { value: "+52", label: "MX (+52)" },
    { value: "+56", label: "CL (+56)" },
    { value: "+54", label: "AR (+54)" },
    { value: "+20", label: "EG (+20)" },
    { value: "+90", label: "TR (+90)" },
    { value: "+966", label: "SA (+966)" },
    { value: "+974", label: "QA (+974)" },
    { value: "+968", label: "OM (+968)" },
];


export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      countryCode: "+91",
      whatsapp: "",
      email: "",
      customService: "",
    },
  });

  const selectedService = form.watch("service");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const fullWhatsapp = `${values.countryCode}${values.whatsapp}`;
        const submissionData = { ...values, whatsapp: fullWhatsapp };

      await submitInquiry(submissionData);
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
        <FormItem>
            <FormLabel>WhatsApp Number</FormLabel>
            <div className="flex gap-2">
                <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                        <FormItem className="w-1/4">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Code" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {countryCodes.map((c, i) => <SelectItem key={`${c.value}-${c.label}-${i}`} value={c.value}>{c.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormControl>
                        <Input placeholder="Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </FormItem>

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
