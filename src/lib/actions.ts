"use server";

import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  whatsapp: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  service: z.enum(["ai-image", "web-scraping", "custom"]),
});

export async function submitInquiry(data: unknown) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid form data.");
  }

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it and simulate a delay.
  console.log("New Inquiry:", parsedData.data);

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential error
  if (parsedData.data.name.toLowerCase() === "error") {
      throw new Error("Failed to submit inquiry.");
  }

  return { success: true, message: "Inquiry submitted successfully." };
}
