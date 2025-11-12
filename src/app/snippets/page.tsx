'use client'
import React, { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Share2,
  Trash2,
  Pencil,
  Github,
  LockKeyhole,
  Star,
  Link,
  Copy,
  Calendar,
  User,
  Tag,
  Clock,
  Download,
  Bookmark,
  Heart,
  Code,
  Eye as PreviewIcon,
  Edit
} from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SnippetPageSkeleton from "./components/snippet/snippet-details-skeleton";
import SnippetDetailsCode from "./components/snippet/snippet-details-code";
import EditTitle from "./components/tools/edit";
import ShareSnippet from "./components/tools/share";


export default function SnippetDetailsPage() {


  const [loading, setloading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setloading(!loading)
    }, 3000);
  }, [])


  const snippetData = {
    title: "Useful Linux Commands",
    description: "A collection of essential Linux commands for system administration, file management, and process monitoring. This includes common bash commands that every developer should know.",
    code: `# File operations
find . -name "*.js" -type f
grep -r "console.log" .
chmod +x script.sh

# System monitoring
htop
df -h
free -h

# Network
netstat -tulpn
ssh user@hostname
scp file.txt user@hostname:/path/`,

    tags: [
      { name: "Shell Scripts", color: "blue" },
      { name: "Dev Machine", color: "amber" },
      { name: "Bash", color: "emerald" },
      { name: "Linux", color: "violet" },
      { name: "System Admin", color: "rose" }
    ],
    author: "Rui Jiang",
    createdAt: "Jul 28, 2017 - 10:08 AM",
    updatedAt: "Aug 15, 2024 - 03:45 PM",
    isFavorite: true,
    isPrivate: true,
    language: "bash",
    extension: ".js",
    githubUrl: "https://github.com/ruijiang/linux-commands",
    views: 1247,
    downloads: 892,
    version: "v2.1"
  };

  const getTagColors = (color: string) => {
    const colors = {
      blue: "bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50",
      amber: "bg-amber-100/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50",
      emerald: "bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50",
      violet: "bg-violet-100/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/50",
      rose: "bg-rose-100/80 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/50",
      slate: "bg-slate-100/80 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/50"
    };
    return colors[color as keyof typeof colors] || colors.slate;
  };

  if (loading) {
    return <SnippetPageSkeleton />
  }

  return (

    <div className="relative">

      <TooltipProvider>
        <div className="sticky top-15 h-10 border-t border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-background z-10">
          <Select>
            <SelectTrigger className="w-[180px] border-0 shadow-none border-r border-gray-200 dark:border-gray-700 h-12 rounded-none focus:ring-0 focus:ring-offset-0 focus:outline-0 px-4 ">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Versions</SelectLabel>
                <SelectItem value="v1.0">v1.0</SelectItem>
                <SelectItem value="v2.0">v2.0</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-muted-foreground w-full px-4 flex items-center justify-between group-hover:bg-white/50 dark:group-hover:bg-gray-800/30 transition-colors">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 truncate">
              https://ui.shadcn.com/docs/components/select
            </p>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600">
                    <Link className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open link</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-emerald-600">
                    <Copy className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-green-600">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <Select>
            <SelectTrigger className="w-[180px] border-0 shadow-none border-l border-gray-200 dark:border-gray-700 h-12 rounded-none focus:ring-0 focus:ring-offset-0 focus:outline-0 px-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="View options" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View Options</SelectLabel>
                <SelectItem value="preview">Preview</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="min-h-screen bg-sidebar/50 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              {/* Title and Actions Row */}
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      {snippetData.title}
                    </h1>
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {snippetData.isFavorite ? (
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            ) : (
                              <Star className="w-4 h-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{snippetData.isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                        </TooltipContent>
                      </Tooltip>

                      {snippetData.isPrivate && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <LockKeyhole className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Private snippet</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground max-w-4xl leading-relaxed">
                    {snippetData.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="relative gap-1.5 h-8 text-sm overflow-hidden
                            before:absolute before:inset-0 before:bg-linear-to-r
                            before:from-transparent before:to-primary/15
                            before:opacity-0 hover:before:opacity-100
                            before:transition-opacity
                            before:-z-2 z-2 cursor-pointer">
                        <Github className="w-3.5 h-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View on GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                  <EditTitle title={snippetData.title} description={snippetData.description} />
                  <ShareSnippet />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive cursor-pointer hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete snippet</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5 bg-muted/30 px-2.5 py-1 rounded-lg">
                    <User className="w-3 h-3" />
                    <span>Created by {snippetData.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/30 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3 h-3" />
                    <span>{snippetData.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/30 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3" />
                    <span>Updated {snippetData.updatedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/30 px-2.5 py-1 rounded-lg">
                    <Eye className="w-3 h-3" />
                    <span>{snippetData.views} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm font-normal px-2 py-0.5 rounded-lg">
                    {snippetData.language}
                  </Badge>
                  <Badge variant="secondary" className="text-sm font-normal px-2 py-0.5 rounded-lg">
                    {snippetData.version}
                  </Badge>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 text-muted-foreground" />
                <div className="flex flex-wrap gap-1.5">
                  {snippetData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`flex items-center text-sm px-2.5 py-1 rounded-full border backdrop-blur-sm transition-all hover:scale-105 cursor-pointer ${getTagColors(tag.color)}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <SnippetDetailsCode snippetData={snippetData} />
          </div>
        </div>
      </TooltipProvider>
    </div>

  );
}