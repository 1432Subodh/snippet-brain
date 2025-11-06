"use client"

import * as React from "react"
import { ArchiveX, Command, FolderOpenDot, Code2, Tag, Star } from "lucide-react"

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
import { NavUser } from "./nav-user"
import Link from "next/link"
import SnippetList from "./all-snippet"

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

export  function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()
  
  
  // const [isLoading, setIsLoading] = React.useState(true)
  // React.useEffect(() => {
  //   const loadData = async () => {
  //     // Simulate loading for 10 seconds
  //     await new Promise((resolve) => setTimeout(resolve, 2000))
  //     setIsLoading(false)
  //   }

  //   loadData()
  // }, [])

  // if (isLoading) {
  //   return <Loader />
  // }

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
          <SidebarGroup className="px-0 pt-0">
            <SidebarGroupContent className="">
              <SnippetList/>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
