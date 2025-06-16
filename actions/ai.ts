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
    throw new Error("Failed to save query to database");
  }
}

export async function getQueriesByEmail(
  email: string,
  page: number = 1,
  pageSize: number = 10
) {
  console.log("Fetching queries for email:", email);
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    await db(); // Ensure the database connection is established

    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip
    const totalQueries = await Query.countDocuments({ email }); // Count total queries for pagination
    const totalPages = Math.ceil(totalQueries / pageSize); // Calculate total pages

    // Fetch queries with pagination
    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    console.log(
      `Fetched ${queries.length} queries for email: ${email}, page: ${page}`
    );
    console.log("Queries fetched successfully:", queries);

    return { queries, totalPages, page };
  } catch (error) {
    console.error("Error fetching queries:", error);
    throw new Error("Failed to fetch queries");
  }
}

export async function usageCount(email: string) {
  try {
    await db();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const result = await Query.aggregate([
      {
        $match: {
          email: email,
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, currentYear] },
              { $eq: [{ $month: "$createdAt" }, currentMonth] },
            ],
          },
        },
      },
      {
        $project: {
          wordCount: {
            $size: {
              $split: [{ $trim: { input: "$content" } }, " "],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalWords: { $sum: "$wordCount" },
        },
      },
    ]);

    return { count: result.length > 0 ? result[0].totalWords : 0 };
  } catch (error) {
    console.error("Error counting usage:", error);
    throw new Error("Failed to count usage");
  }
}
