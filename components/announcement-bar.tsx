"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  // TODO: Replace with Supabase query for urgent announcements
  const announcement = {
    id: 1,
    message: "🚨 Emergency Relief Fund: Help families affected by recent floods. Every donation counts!",
    link: "/donate",
    isUrgent: true,
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          announcement.isUrgent ? "bg-red-600 text-white" : "bg-blue-600 text-white"
        } relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm font-medium text-center flex-1">{announcement.message}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs" asChild>
                <a href={announcement.link}>Learn More</a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close announcement</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
