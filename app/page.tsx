"use client";

import { generateContent } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setContent("");

    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const generatedContent = await generateContent(prompt);
      setContent(generatedContent);
      console.log("Generated content:", generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);

      setError("Failed to generate content. Please try again.");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleGenerate}>
        <Input
          className="mb-5"
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button disabled>Generate with AI</Button>
      </form>
      <Card className="mt-5">
        <CardHeader className="font-bold text-blue-600">
          AI Response will appear here
        </CardHeader>
        <CardContent>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
