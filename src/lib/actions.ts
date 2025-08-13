
"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  whatsapp: z.string().min(10, "Please enter a valid WhatsApp number."),
  email: z.string().email().optional().or(z.literal('')),
  service: z.enum(["ai-image", "web-scraping", "custom"]),
  customService: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export type Inquiry = InquiryFormData & {
  id: string;
  submittedAt: string;
};

const submissionsPath = path.join(process.cwd(), 'submissions.json');

async function readSubmissions(): Promise<Inquiry[]> {
  try {
    const data = await fs.readFile(submissionsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array.
      return [];
    }
    console.error("Failed to read submissions file:", error);
    throw new Error("Could not read submissions.");
  }
}

async function writeSubmissions(data: Inquiry[]): Promise<void> {
  try {
    await fs.writeFile(submissionsPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write to submissions file:", error);
    throw new Error("Could not save submission.");
  }
}

export async function submitInquiry(data: InquiryFormData) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid form data:", parsedData.error.flatten());
    throw new Error("Invalid form data.");
  }

  try {
    const submissions = await readSubmissions();
    const newInquiry: Inquiry = {
      ...parsedData.data,
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
    };
    submissions.unshift(newInquiry); // Add to the beginning
    await writeSubmissions(submissions);

    return { success: true, message: "Inquiry submitted successfully." };
  } catch (error) {
    console.error("Error during form submission process:", error);
    // This will be caught by the form's try-catch block
    throw new Error("Failed to submit inquiry due to a server error.");
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const submissions = await readSubmissions();
    // Sort by date, newest first
    return submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return []; // Return empty array on error
  }
}

export async function deleteInquiry(id: string) {
    if (!id) {
        throw new Error("No ID provided for deletion.");
    }

    try {
        let submissions = await readSubmissions();
        const initialLength = submissions.length;
        
        submissions = submissions.filter(inq => inq.id !== id);

        if (submissions.length === initialLength) {
             throw new Error("Inquiry not found for deletion.");
        }

        await writeSubmissions(submissions);
        return { success: true, message: "Inquiry deleted." };
    } catch (error: any) {
        console.error("Error deleting inquiry:", error);
        throw new Error(error.message || "Could not delete the inquiry.");
    }
}
