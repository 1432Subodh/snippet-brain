"use client"

import * as React from "react"
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ColorSwitcher } from "@/components/setting/Appearance/color-switcher"

// ----------------------
// Settings Dialog
// ----------------------
const data = {
  nav: [
    { name: "Notifications", icon: Bell },
    { name: "Navigation", icon: Menu },
    { name: "Home", icon: Home },
    { name: "Appearance", icon: Paintbrush },
    { name: "Messages & media", icon: MessageCircle },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Mark as read", icon: Check },
    { name: "Audio & video", icon: Video },
    { name: "Connected accounts", icon: Link },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Advanced", icon: Settings },
  ],
}

export function SettingsDialog() {
  const [active, setActive] = React.useState("Appearance")
    const [settingsOpen, setSettingsOpen] = React.useState(false)
  

  // ✅ Keyboard shortcut (Ctrl + ,)
  React.useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        setSettingsOpen((prev: boolean) => !prev)
      }
    }
    window.addEventListener("keydown", handleShortcut)
    return () => window.removeEventListener("keydown", handleShortcut)
  }, [setSettingsOpen])

  return (
    <>
    

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[800px]">
          <DialogTitle className="sr-only">Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Customize your settings here.
          </DialogDescription>

          <SidebarProvider className="items-start">
            {/* Sidebar */}
            <Sidebar collapsible="none" className="hidden md:flex">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {data.nav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            variant="custom"
                            asChild
                            isActive={item.name === active}
                            onClick={() => setActive(item.name)}
                          >
                            <button className="flex w-full items-center gap-2">
                              <item.icon size={18} />
                              <span>{item.name}</span>
                            </button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            {/* Main Content */}
            <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
              {/* Header */}
              <header className="flex h-14 shrink-0 items-center gap-2 border-b">
                <div className="flex items-center gap-2 px-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{active}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-2">
                {active === "Appearance" ? (
                  <div className="max-w-lg">
                    <ColorSwitcher />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
                      />
                    ))}
                  </div>
                )}
              </div>
            </main>
          </SidebarProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
