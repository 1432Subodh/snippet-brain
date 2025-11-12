"use client";
import Highlight, { defaultProps } from "prism-react-renderer";
import githubLight from "prism-react-renderer/themes/github";
import vsDark from "prism-react-renderer/themes/vsDark";
import { useTheme } from "next-themes";
import { Copy, Edit, Search, X, Zap, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@monaco-editor/react";
import { useState, useMemo } from "react";

// Language data with actual logos from devicons
const languageData: Record<string, { name: string; logo: string; color: string }> = {
  javascript: {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "hover:border-yellow-400"
  },
  typescript: {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "hover:border-blue-500"
  },
  html: {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "hover:border-orange-500"
  },
  css: {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "hover:border-blue-400"
  },
  python: {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "hover:border-blue-600"
  },
  java: {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "hover:border-red-500"
  },
  cpp: {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "hover:border-blue-400"
  },
  c: {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "hover:border-gray-500"
  },
  php: {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "hover:border-purple-500"
  },
  ruby: {
    name: "Ruby",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    color: "hover:border-red-400"
  },
  go: {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "hover:border-cyan-500"
  },
  rust: {
    name: "Rust",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    color: "hover:border-orange-600"
  },
  swift: {
    name: "Swift",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    color: "hover:border-orange-400"
  },
  kotlin: {
    name: "Kotlin",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    color: "hover:border-purple-400"
  },
  sql: {
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "hover:border-blue-300"
  },
  shell: {
    name: "Shell",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    color: "hover:border-gray-400"
  },
  markdown: {
    name: "Markdown",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
    color: "hover:border-gray-500"
  },
  json: {
    name: "JSON",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
    color: "hover:border-gray-400"
  },
  yaml: {
    name: "YAML",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/yaml.svg",
    color: "hover:border-red-400"
  },
  xml: {
    name: "XML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",
    color: "hover:border-yellow-500"
  },
};

const languageMap: Record<string, string> = {
  javascript: "javascript", typescript: "typescript",
  jsx: "javascript", tsx: "typescript", html: "html", css: "css", json: "json",
  bash: "shell", sh: "shell", shell: "shell", md: "markdown", markdown: "markdown",
  py: "python", python: "python", go: "go", sql: "sql", c: "c", cpp: "cpp",
  java: "java", php: "php", ruby: "ruby", rust: "rust", swift: "swift", kotlin: "kotlin",
  yaml: "yaml", xml: "xml",
};

const languageOptions = Object.keys(languageMap);

function SnippetBlock({ snippetData }: any) {
  const { theme } = useTheme();
  const prismTheme = theme === "dark" ? vsDark : githubLight;

  const [code, setCode] = useState(snippetData.code || "");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(snippetData.language?.toLowerCase() || "javascript");
  const [searchQuery, setSearchQuery] = useState("");

  const editorLang = languageMap[lang] || "plaintext";
  const currentLanguage = languageData[editorLang] || { name: editorLang, logo: "", color: "" };

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return languageOptions;
    return languageOptions.filter(language =>
      language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "JetBrains Mono, monospace",
    lineHeight: 20,
    tabSize: 2,
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    automaticLayout: true,
    padding: { top: 16 },
  };

  function handleEditorMount(editor: any) {
    editor.getAction("editor.action.formatDocument")?.run();
  }

  const handleSave = () => {
    console.log("Saving snippet:", { code, lang });
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="border rounded-lg overflow-hidden bg-muted/20 shadow-sm transition-all hover:shadow-md">

        <div className="flex items-center justify-between px-4 py-2 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {currentLanguage.logo ? (
              <img
                src={currentLanguage.logo}
                alt={currentLanguage.name}
                className="w-5 h-5 object-contain"
              />
            ) : (
              <Code2 className="w-5 h-5" />
            )}
            <Badge variant="secondary" className="font-medium uppercase">
              {lang}
            </Badge>
            <span className="text-xs text-muted-foreground">{editorLang}</span>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-1.5 h-7 text-sm hover:bg-primary/10 transition-colors">
                  <Edit className="w-3 h-3" /> Edit
                </Button>
              </DialogTrigger>

              <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="overflow-hidden p-0 md:max-w-[1100px] md:max-h-[1000px] rounded-xl border shadow-2xl gap-0">

                <DialogHeader className="px-6 py-4 border-b bg-linear-to-r from-primary/5 to-primary/10">
                  <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Edit Code Snippet
                    <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                      <Zap className="w-3 h-3 mr-1" />
                      Advanced Editor
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden bg-background max-h-[calc(90vh-140px)]">

                  {/* Sidebar */}
                  <div className="w-80 border-r bg-linear-to-b from-muted/10 to-background p-6 space-y-6 overflow-y-auto">
                    {/* Language Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Language
                      </Label>
                      <Select value={lang} onValueChange={setLang}>
                        <SelectTrigger className="w-full bg-background border-2 hover:border-primary/50 transition-colors">
                          <div className="flex items-center gap-3">
                            {currentLanguage.logo ? (
                              <img
                                src={currentLanguage.logo}
                                alt={currentLanguage.name}
                                className="w-5 h-5 object-contain"
                              />
                            ) : (
                              <Code2 className="w-5 h-5" />
                            )}
                            <SelectValue placeholder="Select language" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="p-0 border shadow-xl max-h-80">
                          <div className="p-3 border-b bg-muted/10 sticky top-0 z-10">
                            <div className="relative">
                              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search languages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-9 border-2 focus:border-primary/50"
                                onClick={(e) => e.stopPropagation()}
                              />
                              {searchQuery && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-1 top-1 h-6 w-6 p-0 hover:bg-primary/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchQuery("");
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>

                          <ScrollArea className="h-60">
                            <div className="p-2">
                              {filteredLanguages.length > 0 ? (
                                filteredLanguages.map((language) => {
                                  const langData = languageData[languageMap[language]] || { name: language, logo: "", color: "" };
                                  return (
                                    <SelectItem
                                      key={language}
                                      value={language}
                                      className="flex items-center gap-3 py-3 rounded-lg transition-all hover:bg-primary/5 cursor-pointer"
                                    >
                                      {langData.logo ? (
                                        <></>
                                      ) : (
                                        <Code2 className="w-5 h-5 shrink-0" />
                                      )}
                                      <span className="font-medium capitalize truncate">{language}</span>
                                    </SelectItem>
                                  );
                                })
                              ) : (
                                <div className="text-center text-muted-foreground text-sm py-8">
                                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                  No languages found
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>


                    {/* Popular Languages */}
                    <div className="space-y-3 h-96">

                    </div>
                  </div>

                  {/* Editor Area */}
                  <div className="flex-1 flex flex-col bg-background min-w-0">
                    {/* Editor Header */}
                    <div className="px-6 py-3 border-b bg-linear-to-r from-muted/10 to-muted/5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3 min-w-0">
                        {currentLanguage.logo ? (
                          <img
                            src={currentLanguage.logo}
                            alt={currentLanguage.name}
                            className="w-6 h-6 object-contain shrink-0"
                          />
                        ) : (
                          <Code2 className="w-6 h-6 shrink-0" />
                        )}
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm font-semibold capitalize truncate">{lang}</span>
                          <Badge variant="outline" className="text-xs bg-primary/5 shrink-0">
                            {editorLang}
                          </Badge>
                        </div>
                        <div className="w-px h-4 bg-border mx-2 shrink-0" />
                        <div className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                          {code.split("\n").length} lines • {code.length} chars
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs bg-background hover:bg-primary/10 transition-colors shrink-0"
                        onClick={() => navigator.clipboard.writeText(code)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Code
                      </Button>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1 relative min-h-0">
                      <Editor
                        height="100%"
                        language={editorLang}
                        theme={theme === "dark" ? "vs-dark" : "vs-light"}
                        value={code}
                        options={editorOptions}
                        onChange={(value) => setCode(value || "")}
                        onMount={handleEditorMount}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t bg-linear-to-r from-muted/10 to-muted/5 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground min-w-0">
                    {currentLanguage.logo ? (
                      <img
                        src={currentLanguage.logo}
                        alt={currentLanguage.name}
                        className="w-5 h-5 object-contain shrink-0"
                      />
                    ) : (
                      <Code2 className="w-5 h-5 shrink-0" />
                    )}
                    <span className="truncate">
                      Editing <strong className="text-foreground">{currentLanguage.name}</strong> •
                      {code.split("\n").length} lines • {code.length} characters
                    </span>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="border-muted hover:bg-muted/50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="gap-2 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-7 text-sm hover:bg-primary/10 transition-colors"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              <Copy className="w-3 h-3" /> Copy
            </Button>
          </div>
        </div>

        {/* Code Display */}
        <Highlight {...defaultProps} code={code} language={lang} theme={prismTheme}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={style}
              className="p-4 overflow-x-auto text-sm leading-relaxed bg-white dark:bg-black max-h-[500px] overflow-y-auto"
            >
              {tokens.map((line, i) => {
                const { key, ...rest } = getLineProps({ line, key: i });
                return (
                  <div key={key} {...rest} className="table-row group hover:bg-primary/5 transition-colors">
                    <span className="table-cell text-right pr-4 select-none text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {i + 1}
                    </span>
                    <span className="table-cell whitespace-pre">
                      {line.map((token, j) => {
                        const tokenProps = getTokenProps({ token, key: j });
                        const tokKey = tokenProps.key;
                        const { key: _k, ...tokRest } = tokenProps;
                        return <span key={tokKey} {...tokRest} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

export default SnippetBlock;