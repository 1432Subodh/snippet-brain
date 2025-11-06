'use client'
import { useEffect, useState } from "react"
import Spinner from "./spinner"

export default function Loader() {
    const [currentSnippet, setCurrentSnippet] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    const snippets = [
        {
            title: "Simple API Call (Python)",
            language: "python",
            code: `import requests

def get_snippetbrain_posts():
    url = "https://api.snippetbrain.com/posts"
    response = requests.get(url)
    if response.ok:
        print("Posts fetched successfully!")
    else:
        print("Error fetching SnippetBrain posts")

get_snippetbrain_posts()`,
        },
        {
            title: "React Hook Example",
            language: "typescript",
            code: `import { useState, useEffect } from "react";

function useSnippetBrainData() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("SnippetBrain hook mounted");
    setCount((c) => c + 1);
  }, []);

  return count;
}`,
        },
        {
            title: "Simple Loop in C",
            language: "c",
            code: `#include <stdio.h>

int main() {
  printf("Welcome to SnippetBrain!\\n");
  for (int i = 1; i <= 5; i++) {
    printf("Snippet %d executed.\\n", i);
  }
  return 0;
}`,
        },
        {
            title: "Basic Program in C++",
            language: "cpp",
            code: `#include <iostream>
using namespace std;

int main() {
  cout << "SnippetBrain C++ demo" << endl;
  for (int i = 0; i < 3; i++) {
    cout << "Line " << i + 1 << " running..." << endl;
  }
  return 0;
}`,
        },
    ]

    // Reset typing animation when snippet changes
    useEffect(() => {
        setDisplayedText("")
        setCurrentIndex(0)
    }, [currentSnippet])

    // Typing animation effect
    useEffect(() => {
        if (currentIndex < snippets[currentSnippet].code.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + snippets[currentSnippet].code[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, 30)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, currentSnippet])

    // Snippet rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSnippet((prev) => (prev + 1) % snippets.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    // Syntax highlighting function
    const highlightSyntax = (text: string) => {
        const lines = text.split('\n')
        return lines.map((line, lineIndex) => {
            const words = line.split(/(\s+)/)
            return (
                <div key={lineIndex} className="flex gap-4">
                    <span className="text-gray-400 dark:text-gray-600 select-none w-4 text-right">
                        {lineIndex + 1}
                    </span>
                    <span className="flex-1">
                        {words.map((word, wordIndex) => {
                            let colorClass = "text-gray-800 dark:text-gray-200"

                            // TypeScript/JavaScript syntax highlighting
                            if (/(const|let|var|function|async|await|return|export|default)/.test(word)) {
                                colorClass = "text-purple-600 dark:text-purple-400"
                            } else if (/(useState|useEffect|fetch|console|map)/.test(word)) {
                                colorClass = "text-cyan-600 dark:text-cyan-400"
                            } else if (/(\(|\)|\[|\]|\{|\}|<|>|;|,|:)/.test(word)) {
                                colorClass = "text-gray-500 dark:text-gray-400"
                            } else if (/(\/api|\/clicked|id|name|state|response|item|data|e|Event)/.test(word)) {
                                colorClass = "text-green-600 dark:text-green-400"
                            } else if (/([0-9]+)/.test(word)) {
                                colorClass = "text-orange-600 dark:text-orange-400"
                            } else if (word.includes('`') || word.includes("'") || word.includes('"')) {
                                colorClass = "text-yellow-600 dark:text-yellow-400"
                            }

                            return (
                                <span key={wordIndex} className={colorClass}>
                                    {word}
                                </span>
                            )
                        })}
                    </span>
                </div>
            )
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-5 dark:opacity-5`">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, rgb(229 231 235 / 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(229 231 235 / 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }} />
                <div className="absolute inset-0 dark:opacity-100 opacity-0" style={{
                    backgroundImage: `
                        linear-gradient(to right, rgb(31 41 55 / 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(31 41 55 / 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute dark:hidden top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute dark:hidden bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Gradient overlays */}
            {/* <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-gray-950 dark:via-gray-950/50 dark:to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-white via-white/50 to-transparent dark:from-gray-950 dark:via-gray-950/50 dark:to-transparent z-20 pointer-events-none"></div> */}

            {/* Code display area */}
            <div className="relative w-full max-w-lg px-8 z-10">
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r  via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l  via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent z-20 pointer-events-none"></div>

                {snippets.map((snippet, index) => {
                    const position = (index - currentSnippet + snippets.length) % snippets.length
                    const isCenter = position === 0

                    if (!isCenter) return null

                    return (
                        <div
                            key={index}
                            className="relative  p-6 "
                        >
                            {/* Minimal header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-sm"></div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-sm"></div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-sm"></div>
                                    </div>
                                    {/* <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {snippet.title}
                                    </span> */}
                                </div>
                                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 backdrop-blur-sm">
                                    {snippet.language}
                                </span>
                            </div>

                            {/* Code content with typing animation */}
                            <div className="font-mono text-sm bg-transparent">
                                <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                                    {highlightSyntax(displayedText)}
                                    {/* Blinking cursor */}
                                    {currentIndex < snippet.code.length && (
                                        <span className="ml-1 w-2 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse inline-block rounded-sm"></span>
                                    )}
                                </pre>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-6">
                <span className=" text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Spinner />  Loading your snippetsbrain...
                </span>
            </div>

            {/* Floating symbols with grid alignment */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute top-20 left-10 font-mono text-6xl text-pink-200 dark:text-pink-900/20 animate-float">{'{'}</span>
                <span className="absolute top-32 right-20 font-mono text-5xl text-yellow-200 dark:text-yellow-900/20 animate-float animation-delay-500">{'}'}</span>
                <span className="absolute bottom-32 left-20 font-mono text-6xl text-green-200 dark:text-green-900/20 animate-float animation-delay-1000">{'<'}</span>
                <span className="absolute bottom-20 right-10 font-mono text-5xl text-blue-200 dark:text-blue-900/20 animate-float animation-delay-1500">{'>'}</span>

                {/* Additional grid-aligned decorative elements */}
                <div className="absolute top-40 right-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse animation-delay-500"></div>
                <div className="absolute top-1/2 left-10 w-3 h-3 border border-blue-300/30 dark:border-blue-700/30 rotate-45 animate-float"></div>
                <div className="absolute top-1/2 right-10 w-3 h-3 border border-pink-300/30 dark:border-pink-700/30 rotate-45 animate-float animation-delay-1000"></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-20px);
                        opacity: 0.4;
                    }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
            `}</style>
        </div>
    )
}