import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { SettingsDialog } from "./components/setting-dialog";

export default function Page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "350px",
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <DynamicBreadcrumb />
                    </header>
                    {children}
                </SidebarInset>


            </SidebarProvider>
            <SettingsDialog />
        </>
    )
}
