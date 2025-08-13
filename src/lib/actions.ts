
"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const inquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  whatsapp: z.string().min(10),
  countryCode: z.string(),
  email: z.string().email().optional().or(z.literal('')),
  service: z.enum(["ai-image", "web-scraping", "custom"]),
  customService: z.string().optional(),
  message: z.string().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema> & {
  submittedAt: string;
};

const submissionsFilePath = path.join(process.cwd(), 'submissions.json');

async function getSubmissions(): Promise<Inquiry[]> {
  try {
    const data = await fs.readFile(submissionsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []; // File doesn't exist, return empty array
    }
    throw error;
  }
}

async function saveSubmissions(submissions: Inquiry[]) {
  await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2));
}

export async function submitInquiry(data: unknown) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid form data:", parsedData.error.flatten());
    throw new Error("Invalid form data.");
  }

  const submissions = await getSubmissions();
  const newInquiry: Inquiry = {
    ...parsedData.data,
    submittedAt: new Date().toISOString(),
  };

  submissions.unshift(newInquiry); // Add to the beginning
  await saveSubmissions(submissions);

  console.log("New Inquiry:", newInquiry);

  // Simulate a potential error
  if (parsedData.data.name.toLowerCase() === "error") {
      throw new Error("Failed to submit inquiry.");
  }

  return { success: true, message: "Inquiry submitted successfully." };
}


export async function getInquiries(): Promise<Inquiry[]> {
    return await getSubmissions();
}
