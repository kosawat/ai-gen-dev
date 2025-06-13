"use client";

import React, { use, useEffect, useRef, useState } from "react";
// import Link from "next/link";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TemplateProps } from "@/utils/types";
import { generateContent } from "@/actions/ai";
import toast from "react-hot-toast";
import Link from "next/link";

const TemplateSlugPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ref
  const editorRef = useRef<Editor>(null);

  const resolvedParams = use(params); // Unwrap the params Promise
  const t = template.find(
    (item) => item.slug === resolvedParams.slug
  ) as TemplateProps;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted query:", query);
    const prompt = t?.aiPrompt + query;
    console.log("Prompt for AI:", prompt);
    setLoading(true);

    try {
      const generatedContent = await generateContent(prompt);
      console.log("Generated content:", generatedContent);
      setContent(generatedContent || "No content generated. Please try again.");
    } catch (error) {
      console.error("Error generating content:", error);
      setContent("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    // setQuery(""); // Clear the input after submission
  };

  useEffect(() => {
    if (content && editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleCopy = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const markdown = editorInstance.getMarkdown();
      try {
        await navigator.clipboard.writeText(markdown);
        toast.success("Content copied to clipboard!");
      } catch (error) {
        console.error("Error copying content:", error);
        toast.error("Failed to copy content.");
      }
    } else {
      toast.error("Nothing to copy.");
    }
  };
  return (
    <>
      <div className="flex justify-between mx-5 my-3">
        <Link href="/dashboard">
          <Button>
            <ArrowLeft />
            <span className="ml-2">Back</span>
          </Button>
        </Link>
        <Button onClick={handleCopy}>
          <Copy />
          <span className="ml-2">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {t?.form.map((item, index) => (
              <div key={index} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5">{item.label}</label>

                {item.field === "input" ? (
                  <Input
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              className="w-full py-6 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Generate Content"
              )}
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            // onChange={() =>
            //   setContent(editorRef.current.getInstance().getMarkdown())
            // }
          />
        </div>
      </div>
    </>
  );
};

export default TemplateSlugPage;
