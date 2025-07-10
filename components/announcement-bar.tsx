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

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0]

      // Fetch the latest upcoming announcement (event_date >= today)
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .gte("event_date", today) // Only get events today or in the future
        .order("event_date", { ascending: true }) // Order by event date (closest first)
        .limit(1)
        .single()

      if (error) {
        // If no upcoming events found, don't show the bar
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
    const eventDate = new Date(ann.event_date)
    const today = new Date()
    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    let message = ""

    if (daysUntilEvent === 0) {
      message = `📅 TODAY: ${ann.title} at ${ann.event_venue}. Don't miss out!`
    } else if (daysUntilEvent === 1) {
      message = `⏰ TOMORROW: ${ann.title} at ${ann.event_venue}. Get ready!`
    } else if (daysUntilEvent > 1) {
      message = `🗓️ Coming Soon: ${ann.title} in ${daysUntilEvent} days at ${ann.event_venue}`
    } else {
      // This case should not happen since we're filtering for upcoming events
      message = `📢 Event: ${ann.title} at ${ann.event_venue}`
    }

    return {
      id: ann.id,
      message,
      link: `/announcement/${ann.id}`,
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  // Don't render anything while loading or if no announcement
  if (loading || !announcement || !isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-red-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm font-medium text-center flex-1 leading-relaxed">{announcement.message}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs font-semibold" asChild>
                <a href={announcement.link}>Learn More</a>
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1" onClick={handleClose}>
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
