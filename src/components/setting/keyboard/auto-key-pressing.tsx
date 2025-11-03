import { CommandItem, CommandShortcut } from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { ReactNode } from "react"

interface AutoKeyPressingParams {
  title: string
  icon: ReactNode
  altKey?: boolean
  bubbles?: boolean
  keyValue: string
}

interface AutoKeyPressingProps {
  keydata: AutoKeyPressingParams
}

function AutoKeyPressing({ keydata }: AutoKeyPressingProps) {
  return (
    <CommandItem
      onSelect={() => {
        const event = new KeyboardEvent("keydown", {
          key: keydata.keyValue,
          altKey: keydata.altKey ?? true,
          bubbles: keydata.bubbles ?? true,
        })
        document.dispatchEvent(event)
      }}
    >
      {keydata.icon}
      <span>{keydata.title}</span>
      <CommandShortcut>
        <KbdGroup className="text-xs scale-90">
          <Kbd>{keydata.altKey ? "Alt" : "Ctrl"}</Kbd>
          <span>+</span>
          <Kbd className="uppercase">{keydata.keyValue}</Kbd>
        </KbdGroup>
      </CommandShortcut>
    </CommandItem>
  )
}

export default AutoKeyPressing
