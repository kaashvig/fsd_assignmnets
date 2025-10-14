"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function ProfileCard({
  name,
  bio,
  avatarUrl,
}: {
  name: string
  bio: string
  avatarUrl: string
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="size-24 ring-2 ring-border">
              <AvatarImage
                src={avatarUrl || "/placeholder.svg"}
                alt={`${name}'s profile picture`}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-foreground text-xl">{initials}</AvatarFallback>
            </Avatar>

            <h1 className="mt-4 text-pretty text-2xl font-semibold tracking-tight">{name}</h1>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">{bio}</p>

            <div className="mt-4 flex w-full items-center justify-center">
              <Button className="min-w-32" aria-label="Edit Profile">
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
