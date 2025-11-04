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

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false)

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

    return (
        <>
            <p className="text-muted-foreground text-sm">
                Press{" "}
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen} className="bg-red">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>

                        <CommandItem
                            onSelect={() => {
                                const event = new KeyboardEvent("keydown", {
                                    key: 's',
                                    altKey: true,
                                    bubbles: true,
                                })
                                document.dispatchEvent(event)
                            }}
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
