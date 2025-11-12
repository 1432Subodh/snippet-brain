import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
    Link,
    Copy,
    Download,
} from "lucide-react";
import SnippetBlock from "./snippet-code";
import { handleDownload } from "../../../../../helper/download-file";

function SnippetDetailsCode({ snippetData }: any) {

    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Code Section - 3/4 width */}
            <div className="lg:col-span-3 space-y-4">
                {/* Code Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Code</h2>
                    <div className="flex items-center gap-2">

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => {
                                    handleDownload(snippetData.code, snippetData.title, snippetData.extension)
                                }}
                                    variant="outline" size="sm" className="gap-1.5 h-8 text-sm bg-primary! text-primary-foreground!">
                                    <Download className="w-3 h-3" />
                                    Download
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download snippet</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <SnippetBlock snippetData={snippetData} />


            </div>

            {/* Sidebar - 1/4 width */}
            <div className="space-y-4">


                {/* Share Section */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Share Snippet</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 p-2 border rounded-lg bg-muted/20">
                            <Link className="w-3 h-3 text-muted-foreground shrink-0" />
                            <span className="text-sm flex-1 truncate font-mono">
                                snippets.app/linux-commands
                            </span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="w-2.5 h-2.5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy link</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                    </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Snippet Info */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Snippet Info</h3>
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Language:</span>
                            <Badge variant="secondary" className="text-sm">{snippetData.language}</Badge>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Version:</span>
                            <span className="font-medium">{snippetData.version}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Visibility:</span>
                            <span className="font-medium">{snippetData.isPrivate ? "Private" : "Public"}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Downloads:</span>
                            <span className="font-medium">{snippetData.downloads}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5">
                            <span className="text-muted-foreground">License:</span>
                            <span className="font-medium">MIT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnippetDetailsCode