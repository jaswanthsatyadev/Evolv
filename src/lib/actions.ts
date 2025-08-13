
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Load environment variables
require('dotenv').config({ path: '.env.local' });


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


const formatService = (service: string) => {
    switch(service) {
        case 'ai-image': return 'AI Image Service';
        case 'web-scraping': return 'Web Scraping';
        case 'custom': return 'Custom Solution';
        default: return 'N/A';
    }
}

export async function submitInquiry(data: InquiryFormData) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid form data:", parsedData.error.flatten());
    throw new Error("Invalid form data.");
  }

  const { name, company, whatsapp, email, service, customService, message } = parsedData.data;

  // IMPORTANT: For Gmail, you might need to use an "App Password" 
  // if you have 2-Factor Authentication enabled.
  // See: https://support.google.com/accounts/answer/185833
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env.local
      pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env.local
    },
  });

  const mailOptions = {
    from: `"Evolv AI Agency" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Sending to yourself
    subject: `New Inquiry from ${name} (${company})`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #0B2C34;">New Inquiry from Evolv AI Website</h2>
        <p>A new inquiry has been submitted through the contact form.</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace('+', '')}">${whatsapp}</a></p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Service of Interest:</strong> ${formatService(service)}</p>
        ${service === 'custom' ? `<p><strong>Custom Requirement:</strong> ${customService}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <hr>
        <p style="font-size: 0.8em; color: #555;">This email was sent automatically from your website.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Inquiry submitted successfully." };
  } catch (error) {
    console.error("Failed to send email:", error);
    // This will be caught by the form's try-catch block
    throw new Error("Failed to submit inquiry due to a server error.");
  }
}

// The following functions are no longer active as we are not using a DB.
// They can be removed or kept for future database integration.

export async function getInquiries(): Promise<Inquiry[]> {
  console.log("getInquiries is not active. Submissions are sent via email.");
  return Promise.resolve([]);
}

export async function deleteInquiry(id: string) {
    console.log("deleteInquiry is not active. Submissions are sent via email.");
    return Promise.resolve({ success: true, message: "This action is not available." });
}
