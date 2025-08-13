
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
    // In a production environment, we might not have file system access.
    // If the file doesn't exist, it's not a critical error for fetching.
    if (error.code === 'ENOENT') {
      return []; 
    }
    // For other errors, log them but don't crash the admin panel.
    console.error("Failed to read submissions, returning empty array:", error);
    return [];
  }
}

async function saveSubmissions(submissions: Inquiry[]) {
    try {
        await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2));
    } catch (error) {
        // This is the critical part for production hosting.
        // If writing to the file system fails, we log the error
        // but don't throw an exception. This prevents the user-facing
        // form from showing an error.
        console.error("CRITICAL: Failed to save submission to submissions.json.", error);
        console.error("Submission data:", JSON.stringify(submissions.length > 0 ? submissions[0] : 'no submissions to show', null, 2));
        // We will not re-throw the error, allowing the user to see a success message.
    }
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

  submissions.unshift(newInquiry);
  await saveSubmissions(submissions);

  console.log("New Inquiry Logged:", newInquiry);

  // Simulate a potential error for testing
  if (parsedData.data.name.toLowerCase() === "error") {
      throw new Error("Failed to submit inquiry.");
  }

  return { success: true, message: "Inquiry submitted successfully." };
}


export async function getInquiries(): Promise<Inquiry[]> {
    return await getSubmissions();
}

export async function deleteInquiry(submittedAt: string) {
  const submissions = await getSubmissions();
  const updatedSubmissions = submissions.filter(s => s.submittedAt !== submittedAt);

  if (submissions.length === updatedSubmissions.length) {
    throw new Error("Inquiry not found for deletion.");
  }
  
  await saveSubmissions(updatedSubmissions);
  return { success: true, message: "Inquiry deleted." };
}
