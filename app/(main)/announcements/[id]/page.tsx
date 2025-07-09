"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, MapPin, FileText, ArrowLeft, Clock,  ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import type { AnnouncementRecord } from "@/components/types/announcement"

export default function AnnouncementDetailPage() {
  const [announcement, setAnnouncement] = useState<AnnouncementRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const isImageFile = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url)

  useEffect(() => {
    if (id) {
      fetchAnnouncement()
    }
  }, [id])

  const fetchAnnouncement = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single()

      if (error) {
        throw error
      }

      setAnnouncement(data)
    } catch (err) {
      console.error("Error fetching announcement:", err)
      setError("Failed to load announcement details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isUpcomingEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return eventDate >= today
  }

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading announcement details...</p>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Announcement Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The announcement you're looking for doesn't exist."}</p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/announcements")} className="bg-red-600 hover:bg-red-700">
              View All Announcements
            </Button>
            <Button onClick={fetchAnnouncement} variant="outline" className="w-full bg-transparent">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const upcoming = isUpcomingEvent(announcement.event_date)
  const daysUntil = getDaysUntilEvent(announcement.event_date)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Back Button */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-white/80 bg-white/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Announcements</span>
            </Button>
          </motion.div>

          {/* Main Content */}
          <motion.div className="max-w-4xl mx-auto" variants={fadeInUp}>
            <Card className="border-0 shadow-2xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={
                    announcement.brochure_url && isImageFile(announcement.brochure_url)
                      ? announcement.brochure_url
                      : "/joy-givingLogo.png"
                  }
                  alt={announcement.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge
                    className={
                      upcoming
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }
                  >
                    {upcoming ? "Upcoming Event" : "Past Event"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-8">
                {/* Title and Date */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>

                  {/* Event Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-semibold text-gray-900">{formatDate(announcement.event_date)}</div>
                        <div className="text-sm text-gray-600">{formatTime(announcement.event_date)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Venue</div>
                        <div className="text-sm text-gray-600">{announcement.event_venue}</div>
                      </div>
                    </div>
                  </div>

                  {/* Countdown for upcoming events */}
                  {upcoming && daysUntil > 0 && (
                    <Alert className="border-green-200 bg-green-50 mb-6">
                      <Clock className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>{daysUntil} days</strong> until this amazing event! Mark your calendar! 🗓️
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                      {announcement.description}
                    </p>
                  </div>
                </div>

                {/* Brochure Section */}
                {announcement.brochure_url && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6 text-red-600" />
                          <div>
                            <div className="font-semibold text-gray-900">Event Brochure</div>
                            <div className="text-sm text-gray-600">
                              {isImageFile(announcement.brochure_url)
                                ? "View event image"
                                : "Download detailed information"}
                            </div>
                          </div>
                        </div>
                        <a
                          href={announcement.brochure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{isImageFile(announcement.brochure_url) ? "View" : "Download"}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

               
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
