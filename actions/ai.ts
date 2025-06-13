"use server";

import Query from "@/models/query";
import db from "@/utils/db";
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

export async function saveQueryToDB(
  template: object,
  email: string,
  query: string,
  content?: string
) {
  console.log("Saving query to database:", { template, email, query, content });
  if (!template || !email || !query) {
    throw new Error("Template, email, and query are required");
  }

  try {
    await db(); // Ensure the database connection is established

    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });
    await newQuery.save();
    console.log("Query saved successfully");
    return {
      ok: true,
      message: "Query saved successfully",
    };
  } catch (error) {
    console.error("Error saving query to database:", error);
    return {
      ok: false,
      message: "Failed to save query to database",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
