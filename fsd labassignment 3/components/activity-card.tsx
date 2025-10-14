"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function ActivityCard({
  title,
  timestamp,
  description,
}: {
  title: string
  timestamp: string
  description: string
}) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="group border-border/80 shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="text-pretty text-base font-semibold leading-tight">{title}</h3>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
            <p className="text-pretty text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
