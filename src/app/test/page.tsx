"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function SnippetList() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay
    setTimeout(() => {
      setSnippets([
        {
          title: "React Button Component",
          tags: ["react", "ui", "components"],
          description:
            "Reusable button component built with Tailwind and React.",
          language: "tsx",
          lastModified: "2 hours ago",
          isFavorite: true,
          author: { name: "You" },
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const cards = loading ? Array(4).fill(null) : snippets;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {cards.map((snippet, i) => (
        <SnippetCard key={i} snippet={snippet} loading={loading} />
      ))}
    </div>
  );
}

function SnippetCard({ snippet, loading }: { snippet: any; loading: boolean }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-sm transition bg-background">
      <div className="flex justify-between items-start">
        {loading ? (
          <Skeleton className="h-5 w-3/4" />
        ) : (
          <h2 className="text-base font-semibold">{snippet.title}</h2>
        )}

        {loading ? (
          <Skeleton className="h-4 w-4 rounded-full" />
        ) : (
          snippet.isFavorite && (
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
          )
        )}
      </div>

      {loading ? (
        <div className="space-y-2 mt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-2">
          {snippet.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {(loading ? Array(3).fill(null) : snippet.tags).map((tag: any, i:any) =>
          loading ? (
            <Skeleton key={i} className="h-4 w-12 rounded-md" />
          ) : (
            <span
              key={i}
              className="text-xs bg-secondary px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          )
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
        {loading ? (
          <>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : (
          <>
            <span>{snippet.lastModified}</span>
            <span>{snippet.author.name}</span>
          </>
        )}
      </div>
    </div>
  );
}
