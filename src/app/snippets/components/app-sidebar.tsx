"use client"

import * as React from "react"
import { ArchiveX, Command, FolderOpenDot, Code2, Tag, Star } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { NavUser } from "./nav-user"

// Simplified data for Snippet Manager
const data = {
  user: {
    name: "Subodh Ravidas",
    email: "subodh@example.com",
    avatar: "/avatars/subodh.jpg",
  },
  navMain: [
    {
      title: "All Snippets",
      url: "#",
      icon: Code2,
      isActive: true,
    },
    {
      title: "Favorites",
      url: "#",
      icon: Star,
      isActive: false,
    },
    {
      title: "Tags",
      url: "#",
      icon: Tag,
      isActive: false,
    },
    {
      title: "Collections",
      url: "#",
      icon: FolderOpenDot,
      isActive: false,
    },
    {
      title: "Archived",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Primary sidebar (icons only) */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Smart Snippet</span>
                    <span className="truncate text-xs">Organizer</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Secondary sidebar (content area placeholder) */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            {/* <Label className="flex items-center gap-2 text-sm">
              <span>Starred</span>
              <Switch className="shadow-none" />
            </Label> */}
          </div>
          <SidebarInput placeholder="Search snippets..." />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <div className="p-6 text-sm text-muted-foreground">
                Select a category to view snippets.
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
