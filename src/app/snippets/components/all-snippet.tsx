"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Eye, Check, MoreHorizontal, Star, Clock } from "lucide-react";
import SnippetListSkeleton from "@/components/Skeleton/skeleton-snippet-list";



export default function SnippetList() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const snippets = [
    {
      title: "React Button Component",
      tags: ["react", "ui", "components"],
      description: "Reusable button component built with Tailwind and React.",
      language: "tsx",
      lastModified: "2 hours ago",
      isFavorite: true,
      author: { name: "You", avatar: "" },
    },
    {
      title: "Fetch API Hook",
      tags: ["javascript", "hooks", "api"],
      description: "Custom hook for data fetching with loading and error handling.",
      language: "ts",
      lastModified: "1 day ago",
      isFavorite: false,
      author: { name: "Sarah", avatar: "" },
    },
    {
      title: "Next.js Layout",
      tags: ["nextjs", "layout", "ssr"],
      description: "Starter layout structure with sidebar and top navigation.",
      language: "tsx",
      lastModified: "3 days ago",
      isFavorite: true,
      author: { name: "You", avatar: "" },
    },
    {
      title: "Authentication Context",
      tags: ["react", "auth", "context"],
      description: "Complete authentication context with provider and hooks.",
      language: "tsx",
      lastModified: "1 week ago",
      isFavorite: false,
      author: { name: "Mike", avatar: "" },
    },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      tsx: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      ts: "bg-blue-600/20 text-blue-300 border-blue-600/30",
      js: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      jsx: "bg-yellow-600/20 text-yellow-300 border-yellow-600/30",
      css: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      html: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    };
    return colors[language] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-0">
        {loading ? (
          <SnippetListSkeleton count={snippets.length} />
        ) : (
          snippets.map((snippet, index) => (
            <div
              key={index}
              className="relative overflow-hidden border-b border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Favorite indicator */}
              {snippet.isFavorite && (
                <div className="absolute bottom-3 right-3 z-10">
                  <Star className="size-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                </div>
              )}

              <div className="relative p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 border ${getLanguageColor(snippet.language)}`}
                        >
                          {snippet.language}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {snippet.lastModified}
                        </div>
                      </div>

                      <div
                        className={`flex gap-1 transition-opacity duration-200 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-xs">View snippet</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopy(index)}
                              className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                            >
                              {copiedIndex === index ? (
                                <Check className="size-3.5 text-green-500" />
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-xs">{copiedIndex === index ? "Copied!" : "Copy code"}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-foreground transition-colors line-clamp-1 cursor-pointer pr-8 ">
                      {snippet.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {snippet.description}
                </p>
                <div className="flex flex-wrap gap-1 ">
                  {snippet.tags.slice(0, 2).map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 bg-secondary/50 hover:bg-primary/15 hover:text-primary transition-all duration-200 cursor-default border-border/30"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {snippet.tags.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 text-muted-foreground border-border/30"
                    >
                      +{snippet.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/2 to-primary/5 transition-opacity duration-300 pointer-events-none" />
              )}
            </div>
          ))
        )}
      </div>
    </TooltipProvider>
  );
}
