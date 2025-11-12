'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface EditProps {
  title: string
  description: string
}

function EditTitle({ title, description }: EditProps) {
  const [open, setOpen] = useState(false)
  const [formTitle, setFormTitle] = useState(title)
  const [formDescription, setFormDescription] = useState(description)

  const handleSave = () => {
    console.log('Updated values:', { formTitle, formDescription })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip >
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-8 w-8 text-sm overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-r
                  before:from-transparent before:to-primary/15
                  before:opacity-0 hover:before:opacity-100
                  before:transition-opacity
                  before:-z-10 z-10 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className=" text-xs px-2 py-1 rounded-md shadow-sm">
            Edit snippet
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Snippet</DialogTitle>
          <DialogDescription>Update the details and click save.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditTitle
