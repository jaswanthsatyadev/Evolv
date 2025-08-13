
"use server";

import { z } from "zod";
import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, getDoc } from "firebase/firestore";

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
  submittedAt: string; // Keep as ISO string for Firestore
  id: string;
};


export async function submitInquiry(data: unknown) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid form data:", parsedData.error.flatten());
    throw new Error("Invalid form data.");
  }

  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
        ...parsedData.data,
        submittedAt: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, message: "Inquiry submitted successfully." };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to submit inquiry.");
  }
}


export async function getInquiries(): Promise<Inquiry[]> {
    try {
        const inquiriesCol = collection(db, "inquiries");
        const q = query(inquiriesCol, orderBy("submittedAt", "desc"));
        const inquirySnapshot = await getDocs(q);
        const inquiryList = inquirySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            submittedAt: doc.data().submittedAt,
        } as Inquiry));
        return inquiryList;
    } catch(error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
    }
}

export async function deleteInquiry(id: string) {
    try {
        const docRef = doc(db, "inquiries", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
             throw new Error("Inquiry not found for deletion.");
        }

        await deleteDoc(docRef);
        return { success: true, message: "Inquiry deleted." };
    } catch (error) {
        console.error("Error deleting document:", error);
        throw new Error("Could not delete the inquiry.");
    }
}
