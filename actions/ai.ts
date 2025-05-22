"use server";

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;
const genAi = new GoogleGenAI({ apiKey: apiKey });

export async function generateContent(prompt: string) {
  console.log("Generating content with prompt:", prompt);
  if (!prompt) {
    throw new Error("Prompt is required");
  }
  try {
    const response = await genAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log("Response from Google GenAI:", response);
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
}
