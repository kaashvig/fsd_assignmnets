"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar({
  title,
  userName,
  avatarUrl,
}: {
  title: string
  userName: string
  avatarUrl: string
}) {
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span aria-label={title} className="text-pretty text-lg font-semibold tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline-block">{userName}</span>
          <Avatar className="size-8 ring-1 ring-border">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={`${userName}'s avatar`} className="object-cover" />
            <AvatarFallback className="bg-secondary text-foreground">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  )
}
