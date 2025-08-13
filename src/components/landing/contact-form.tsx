
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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

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
  message: z.string().optional(),
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
    { value: "+91", label: "India", code: "IN" },
    { value: "+1", label: "United States", code: "US" },
    { value: "+1", label: "Canada", code: "CA" },
    { value: "+44", label: "United Kingdom", code: "UK" },
    { value: "+61", label: "Australia", code: "AU" },
    { value: "+64", label: "New Zealand", code: "NZ" },
    { value: "+49", label: "Germany", code: "DE" },
    { value: "+33", label: "France", code: "FR" },
    { value: "+39", label: "Italy", code: "IT" },
    { value: "+34", label: "Spain", code: "ES" },
    { value: "+31", label: "Netherlands", code: "NL" },
    { value: "+46", label: "Sweden", code: "SE" },
    { value: "+47", label: "Norway", code: "NO" },
    { value: "+45", label: "Denmark", code: "DK" },
    { value: "+41", label: "Switzerland", code: "CH" },
    { value: "+65", label: "Singapore", code: "SG" },
    { value: "+81", label: "Japan", code: "JP" },
    { value: "+82", label: "South Korea", code: "KR" },
    { value: "+971", label: "UAE", code: "AE" },
    { value: "+972", label: "Israel", code: "IL" },
    { value: "+62", label: "Indonesia", code: "ID" },
    { value: "+60", label: "Malaysia", code: "MY" },
    { value: "+63", label: "Philippines", code: "PH" },
    { value: "+66", label: "Thailand", code: "TH" },
    { value: "+84", label: "Vietnam", code: "VN" },
    { value: "+92", label: "Pakistan", code: "PK" },
    { value: "+880", label: "Bangladesh", code: "BD" },
    { value: "+27", label: "South Africa", code: "ZA" },
    { value: "+234", label: "Nigeria", code: "NG" },
    { value: "+254", label: "Kenya", code: "KE" },
    { value: "+55", label: "Brazil", code: "BR" },
    { value: "+52", label: "Mexico", code: "MX" },
    { value: "+56", label: "Chile", code: "CL" },
    { value: "+54", label: "Argentina", code: "AR" },
    { value: "+20", label: "Egypt", code: "EG" },
    { value: "+90", label: "Turkey", code: "TR" },
    { value: "+966", label: "Saudi Arabia", code: "SA" },
    { value: "+974", label: "Qatar", code: "QA" },
    { value: "+968", label: "Oman", code: "OM" },
];


export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+91");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      whatsapp: "",
      email: "",
      customService: "",
      message: "",
    },
  });

  const selectedService = form.watch("service");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const submissionData = { 
            ...values, 
            whatsapp: `${countryCode}${values.whatsapp}` 
        };

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
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-[150px] justify-between"
                    >
                        {countryCode
                        ? `${countryCodes.find(
                            (c) => c.value === countryCode
                        )?.code} (${countryCode})`
                        : "Select code"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countryCodes.map((country) => (
                            <CommandItem
                                value={`${country.label} (${country.value})`}
                                key={country.value + country.code}
                                onSelect={() => {
                                setCountryCode(country.value)
                                setPopoverOpen(false)
                                }}
                            >
                                <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    country.value === countryCode
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                                />
                                {country.label} ({country.value})
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </CommandList>
                    </Command>
                    </PopoverContent>
                </Popover>

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
         <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Your Message (Optional)</FormLabel>
                <FormControl>
                    <Textarea placeholder="Any additional details for us?" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" size="lg" className="w-full font-bold bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Inquiry
        </Button>
      </form>
    </Form>
  );
}
