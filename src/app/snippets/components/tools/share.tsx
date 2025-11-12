'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    Facebook,
    Twitter,
    Instagram,
    MessageCircle,
    Link2,
    Share2,
    Check,
    Send,
} from 'lucide-react'

export default function ShareSnippet() {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com/share-link'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const shareOptions = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: 'Instagram',
            icon: Instagram,
            onClick: () => alert('Instagram sharing is available on mobile apps'),
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: 'Telegram',
            icon: Send,
            href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
        },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant="default" size={'default'} className="relative gap-1.5 h-8 text-sm overflow-hidden
                            before:absolute before:inset-0 before:bg-linear-to-r
                            before:from-transparent before:to-primary/15
                            before:opacity-0 hover:before:opacity-100
                            before:transition-opacity
                            before:-z-2 z-2 cursor-pointer">
                                <Share2 className="w-3.5 h-3.5" /> Share
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                        <p>Share</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent className="sm:max-w-lg rounded-2xl gap-5 p-6">
                <DialogHeader className="text-center space-y-2">

                    <DialogTitle className="text-xl font-semibold">
                        Share Content
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Choose how you'd like to share
                    </DialogDescription>
                </DialogHeader>

                {/* Social Icons Grid */}
                <div className="grid grid-cols-5 gap-2">
                    {shareOptions.map(({ name, icon: Icon, href, onClick }) => {
                        const content = (
                            <div className="flex flex-col items-center gap-2 p-3 rounded-xl border hover:bg-accent hover:border-primary transition-all duration-200 cursor-pointer group active:scale-95">
                                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {name}
                                </span>
                            </div>
                        )

                        return href ? (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
                            >
                                {content}
                            </a>
                        ) : (
                            <button
                                key={name}
                                onClick={onClick}
                                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
                            >
                                {content}
                            </button>
                        )
                    })}
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-background px-3 text-muted-foreground font-medium uppercase tracking-wide">
                            Or copy link
                        </span>
                    </div>
                </div>

                {/* Copy Link Box */}
                <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-muted/50 hover:bg-muted transition-all duration-200">
                    <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground truncate flex-1 font-mono">
                        {shareUrl}
                    </span>
                    <Button
                        onClick={handleCopy}
                        size="sm"
                        className={`flex-shrink-0 rounded-lg font-medium transition-all duration-200 active:scale-95 text-xs h-8 px-3 ${copied
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : ''
                            }`}
                        variant={copied ? 'default' : 'default'}
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3 mr-1" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Link2 className="w-3 h-3 mr-1" />
                                Copy
                            </>
                        )}
                    </Button>
                </div>


            </DialogContent>
        </Dialog>
    )
}