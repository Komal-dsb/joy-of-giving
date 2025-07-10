"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, ArrowRight, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { AnnouncementRecord } from "./types/announcement"

interface DisplayAnnouncement {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  isUrgent: boolean
}

export function LatestAnnouncements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [announcements, setAnnouncements] = useState<DisplayAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLatestAnnouncements()
  }, [])

  const fetchLatestAnnouncements = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)

      if (error) throw error

      // Transform the data to match the UI structure
      const transformedData: DisplayAnnouncement[] = (data || []).map((announcement: AnnouncementRecord) => {
        const eventDate = new Date(announcement.event_date)
        const today = new Date()
        const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

        // Determine category based on venue or description keywords
        let category = "Event"
        if (
          announcement.description.toLowerCase().includes("emergency") ||
          announcement.description.toLowerCase().includes("urgent")
        ) {
          category = "Emergency"
        } else if (
          announcement.description.toLowerCase().includes("education") ||
          announcement.description.toLowerCase().includes("school")
        ) {
          category = "Education"
        } else if (announcement.description.toLowerCase().includes("volunteer")) {
          category = "Volunteer"
        }

        return {
          id: announcement.id,
          title: announcement.title,
          excerpt:
            announcement.description.length > 150
              ? announcement.description.substring(0, 150) + "..."
              : announcement.description,
          date: announcement.event_date,
          category,
          isUrgent: daysUntilEvent <= 7 && daysUntilEvent >= 0, // Urgent if event is within 7 days
        }
      })

      setAnnouncements(transformedData)
    } catch (err) {
      console.error("Error fetching announcements:", err)
      setError("Failed to load announcements")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-6">Latest Updates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about our latest initiatives, success stories, and urgent appeals for support.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600">Loading latest announcements...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchLatestAnnouncements} variant="outline">
              Try Again
            </Button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No announcements available at the moment.</p>
            <Button asChild variant="outline">
              <Link href="/">Create New Announcement</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            announcement.isUrgent ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {announcement.category}
                        </span>
                      
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{announcement.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(announcement.date).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" asChild>
                          <Link href={`/announcements/${announcement.id}`}>
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Button size="lg" variant="outline" asChild>
                <Link href="/announcements">
                  View All Announcements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
