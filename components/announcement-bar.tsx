"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import type { AnnouncementRecord } from "./types/announcement"

interface LatestAnnouncement {
  id: string
  message: string
  link: string
}

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [announcement, setAnnouncement] = useState<LatestAnnouncement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestAnnouncement()
  }, [])

  const fetchLatestAnnouncement = async () => {
    try {
      setLoading(true)
      const today = new Date().toISOString().split("T")[0]

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .gte("eventDate", today)
        .order("eventDate", { ascending: true })
        .limit(1)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          setAnnouncement(null)
          setIsVisible(false)
          return
        }
        throw error
      }

      if (data) {
        const latestAnnouncement = createAnnouncementMessage(data)
        setAnnouncement(latestAnnouncement)
        setIsVisible(true)
      }
    } catch (error) {
      console.error("Error fetching latest announcement:", error)
      setAnnouncement(null)
      setIsVisible(false)
    } finally {
      setLoading(false)
    }
  }

  const createAnnouncementMessage = (ann: AnnouncementRecord): LatestAnnouncement => {
    const eventDate = new Date(ann.eventDate)
    const today = new Date()
    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    let message = ""
    if (daysUntilEvent === 0) {
      message = `📅 TODAY: ${ann.title} at ${ann.eventVenue}. Don't miss out!`
    } else if (daysUntilEvent === 1) {
      message = `⏰ TOMORROW: ${ann.title} at ${ann.eventVenue}. Get ready!`
    } else if (daysUntilEvent > 1) {
      message = `🗓️ Coming Soon: ${ann.title} in ${daysUntilEvent} days at ${ann.eventVenue}`
    } else {
      message = `📢 Event: ${ann.title} at ${ann.eventVenue}`
    }

    return {
      id: ann.id,
      message,
      link: `/announcement/${ann.id}`,
    }
  }

  const handleClose = () => setIsVisible(false)

  if (loading || !announcement || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-base text-foreground overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3 relative flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <div className="overflow-hidden whitespace-nowrap relative flex-1">
            <div className=" animate-marquee inline-block">
              <p className="text-sm font-medium">{announcement.message} 
              <span className="px-8 text-sm font-medium">{announcement.message}</span>
               <span className="px-8 text-sm font-medium">{announcement.message}</span>
                <span className="px-8 text-sm font-medium">{announcement.message}</span>
              </p>
             
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-1 ml-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
