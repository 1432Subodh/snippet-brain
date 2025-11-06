"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "./ui/kbd"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()



    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "q" && (e.metaKey || e.altKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // Function to handle navigation
    const handleNavigation = (path: string) => {
        setOpen(false)
        router.push(path)
    }

    return (
        <>


            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => handleNavigation("/test")}>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>

                        <CommandItem onSelect={() => handleNavigation("/emoji")}>
                            <Smile />
                            <span>Search Emoji</span>
                        </CommandItem>

                        <CommandItem onSelect={() => handleNavigation("/calculator")}>
                            <Calculator />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => handleNavigation("/profile")}>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>

                        <CommandItem onSelect={() => handleNavigation("/billing")}>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>

                        <CommandItem
                            onSelect={() => handleNavigation("/settings")}
                        >
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>
                                <KbdGroup className="text-xs scale-90">
                                    <Kbd>Alt</Kbd>
                                    <span>+</span>
                                    <Kbd className="uppercase">s</Kbd>
                                </KbdGroup>
                            </CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
