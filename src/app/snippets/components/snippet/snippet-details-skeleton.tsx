import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SnippetPageSkeleton() {
  return (
    <div className="relative">
      {/* Sticky Header Bar */}
      <div className="sticky top-15 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-between z-10">
        {/* Version Selector Skeleton */}
        <div className="w-[180px] h-12 px-4 flex items-center">
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>

        {/* URL Bar Skeleton */}
        <div className="w-full px-4 flex items-center justify-between">
          <Skeleton className="h-3 w-64 rounded-full" />
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-lg" />
            ))}
          </div>
        </div>

        {/* View Options Skeleton */}
        <div className="w-[180px] h-12 px-4 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      </div>

      <div className="min-h-screen bg-sidebar/30 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section Skeleton */}
          <div className="space-y-6">
            {/* Title and Actions Row */}
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-80 rounded-lg" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-5 w-5 rounded-lg" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 max-w-4xl">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  i==2 ?
                  <Skeleton key={i} className="h-7 w-20 rounded-lg" /> :
                  <Skeleton key={i} className="h-7 w-7 rounded-lg" /> 
                ))}
              </div>
            </div>

            {/* Metadata Row Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-7 w-28 rounded-xl" />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-lg" />
                <Skeleton className="h-6 w-14 rounded-lg" />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton 
                    key={i} 
                    className="h-7 rounded-full" 
                    style={{ width: `${Math.random() * 40 + 60}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Code Section - 3/4 width */}
            <div className="lg:col-span-3 space-y-6">
              {/* Code Header Skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-20 rounded-lg" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-28 rounded-lg" />
                  <Skeleton className="h-9 w-32 rounded-lg" />
                  <Skeleton className="h-9 w-32 rounded-lg" />
                </div>
              </div>

              {/* Code Tabs Skeleton */}
              <div className="space-y-4">
                {/* Tabs List Skeleton */}
                
                

                {/* Code Content Skeleton */}
                <div className="rounded-xl overflow-hidden bg-muted/10">
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/20">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                  
                  {/* Code Lines */}
                  <div className="p-6 space-y-3 bg-background/50">
                    {[...Array(15)].map((_, i) => (
                      <Skeleton 
                        key={i} 
                        className="h-4 rounded" 
                        style={{ 
                          width: `${Math.random() * 50 + 30}%`,
                          opacity: 0.9 - (i * 0.05)
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Content Skeleton */}
              <div className="space-y-6">
                <Separator className="bg-border/30" />
                
                {/* Usage Instructions Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-40 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-11/12 rounded" />
                    <Skeleton className="h-4 w-10/12 rounded" />
                    <Skeleton className="h-4 w-9/12 rounded" />
                  </div>
                </div>

                {/* Related Snippets Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-36 rounded-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/10 space-y-3">
                        <Skeleton className="h-5 w-40 rounded" />
                        <Skeleton className="h-4 w-32 rounded" />
                        <div className="flex gap-2">
                          <Skeleton className="h-3 w-16 rounded-full" />
                          <Skeleton className="h-3 w-12 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/4 width */}
            <div className="space-y-6">
              {/* Share Section Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-28 rounded-lg" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/10">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-1 rounded" />
                    <Skeleton className="h-7 w-7 rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-9 flex-1 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="bg-border/30" />

              {/* Snippet Info Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <div className="space-y-2 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-5 w-16 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-20 rounded-lg" />
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-muted/10 space-y-2">
                      <Skeleton className="h-6 w-12 rounded-lg mx-auto" />
                      <Skeleton className="h-3 w-16 rounded mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}