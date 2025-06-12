"use client";

import React, { use, useState } from "react";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TemplateProps } from "@/utils/types";

const TemplateSlugPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const [query, setQuery] = useState("");

  const resolvedParams = use(params); // Unwrap the params Promise
  const t = template.find(
    (item) => item.slug === resolvedParams.slug
  ) as TemplateProps;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted query:", query);
  };

  return (
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
          <Button type="submit" className="w-full py-6 cursor-pointer">
            Generate content
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TemplateSlugPage;
