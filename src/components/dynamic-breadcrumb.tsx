"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function DynamicBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const formatSegment = (segment: string) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex items-center gap-2 text-sm text-muted-foreground">
                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/")
                    const isLast = index === segments.length - 1

                    return (
                        <div
                            key={href}
                            className="flex items-center gap-2 text-muted-foreground"
                        >
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="text-foreground font-medium">
                                        {formatSegment(segment)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={href}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {formatSegment(segment)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {/* Show separator after each item including the last */}
                            {segments.length - 1 !== index && <BreadcrumbSeparator className="opacity-60" />}
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default DynamicBreadcrumb
