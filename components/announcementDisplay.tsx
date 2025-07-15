"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, AlertCircle, Heart, Megaphone, FileText, MapPin } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "lucide-react"
import type { AnnouncementRecord } from "@/components/types/announcement"

const AnnouncementsDisplay = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isImageFile = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  // Text validation functions
  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(" ")
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(" ") + "..."
  }

 

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("announcements").select("*").order("eventDate", { ascending: true })

      if (error) {
        throw error
      }

      setAnnouncements(data || [])
    } catch (err) {
      console.error("Error fetching announcements:", err)
      setError("Failed to load announcements. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleAnnouncementClick = (announcementId: string) => {
    router.push(`/announcements/${announcementId}`)
  }

  const getTypeIcon = (isUpcoming: boolean) => {
    return isUpcoming ? Calendar : Heart
  }

  const getTypeColor = (isUpcoming: boolean) => {
    return isUpcoming ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isUpcomingEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return eventDate >= today
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-background mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing announcements...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchAnnouncements}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const upcomingAnnouncements = announcements.filter((ann) => isUpcomingEvent(ann.eventDate))
  const pastAnnouncements = announcements.filter((ann) => !isUpcomingEvent(ann.eventDate))
  const featuredAnnouncement = upcomingAnnouncements[0] || announcements[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-32">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={fadeInUp}>
              Latest <span className="text-background">Announcements</span>
            </motion.h1>
            <motion.p className="text-xl text-gray-600 leading-relaxed" variants={fadeInUp}>
              Stay updated with our exciting events, programs, and community initiatives. Be part of something amazing
              happening in your area! ✨
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Featured Announcement */}
      {featuredAnnouncement && (
        <section className="py-20 bg-white">
          <motion.div
            className="container mx-auto px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div variants={fadeInUp}>
                <Card
                  className="overflow-hidden border-0 shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleAnnouncementClick(featuredAnnouncement.id)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                      <Image
                        src={
                          featuredAnnouncement.brochure_url && isImageFile(featuredAnnouncement.brochure_url)
                            ? featuredAnnouncement.brochure_url
                            : "/joy-givingLogo.png"
                        }
                        alt={featuredAnnouncement.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover min-h-96 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-100 text-background border-red-200">
                          <Megaphone className="w-4 h-4 mr-1" />
                          FEATURED
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-3 mb-4">
                        <Calendar className="w-6 h-6 text-background" />
                        <span className="text-red-600 font-semibold uppercase text-sm">
                          {isUpcomingEvent(featuredAnnouncement.eventDate) ? "Upcoming Event" : "Past Event"}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-background transition-colors duration-300">
                        {truncateWords(featuredAnnouncement.title, 50)}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {truncateWords(featuredAnnouncement.description, 150)}
                      </p>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredAnnouncement.eventDate)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {featuredAnnouncement.eventVenue}
                        </div>
                      </div>
                      <div className="text-sm text-background font-medium  transition-colors duration-300">
                        Click to read more →
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingAnnouncements.length > 1 && (
        <section className="py-20 bg-red-50">
          <motion.div
            className="container mx-auto px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 className="text-4xl font-bold text-gray-900 mb-16 text-center" variants={fadeInUp}>
              Upcoming Events
            </motion.h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingAnnouncements.slice(1).map((announcement) => {
                const IconComponent = getTypeIcon(true)
                return (
                  <motion.div key={announcement.id} variants={fadeInUp}>
                    <Card
                      className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden group cursor-pointer"
                      onClick={() => handleAnnouncementClick(announcement.id)}
                    >
                      <div className="relative">
                        <Image
                          src={
                            announcement.brochure_url && isImageFile(announcement.brochure_url)
                              ? announcement.brochure_url
                              : "/joy-givingLogo.png"
                          }
                          alt={announcement.title}
                          width={600}
                          height={300}
                          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getTypeColor(true)}>
                            <IconComponent className="w-4 h-4 mr-1" />
                            UPCOMING
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-background transition-colors duration-300">
                          {truncateWords(announcement.title, 50)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {truncateWords(announcement.description, 150)}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(announcement.eventDate)}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {announcement.eventVenue}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {announcement.brochure_url && (
                            <div className="inline-flex items-center text-background font-semibold text-sm transition-colors duration-300">
                              <FileText className="w-4 h-4 mr-1" />
                              View Details
                            </div>
                          )}
                          <div className="text-sm text-background font-medium transition-colors duration-300">
                            Read more →
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Past Events */}
      {pastAnnouncements.length > 0 && (
        <section className="py-20 bg-white">
          <motion.div
            className="container mx-auto px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 className="text-4xl font-bold text-background mb-16 text-center" variants={fadeInUp}>
              Past Events
            </motion.h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {pastAnnouncements.map((announcement) => {
                const IconComponent = getTypeIcon(false)
                return (
                  <motion.div key={announcement.id} variants={fadeInUp}>
                    <Card
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group cursor-pointer"
                      onClick={() => handleAnnouncementClick(announcement.id)}
                    >
                      <div className="relative">
                        <Image
                          src={
                            announcement.brochure_url && isImageFile(announcement.brochure_url)
                              ? announcement.brochure_url
                              : "/joy-givingLogo.png"
                          }
                          alt={announcement.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getTypeColor(false)}>
                            <IconComponent className="w-4 h-4 mr-1" />
                            PAST
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-background transition-colors duration-300">
                          {truncateWords(announcement.title, 50)}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {truncateWords(announcement.description, 150)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-background">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(announcement.eventDate)}
                          </div>
                          <div className="flex items-center space-x-2">
                            {announcement.brochure_url && (
                              <div className="inline-flex items-center text-md text-background font-semibold transition-colors duration-300">
                                <FileText className="w-4 h-4 mr-1" />
                                View
                              </div>
                            )}
                            <div className="text-background font-medium  transition-colors duration-300">
                              →
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Empty State */}
      {announcements.length === 0 && (
        <section className="py-20 bg-red-50">
          <motion.div
            className="container mx-auto px-4 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Announcements Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Stay tuned! Amazing events and announcements are coming soon. Check back later for exciting updates! ✨
            </p>
          </motion.div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-background to-background text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            Stay Connected
          </motion.h2>
          <motion.p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" variants={fadeInUp}>
            Subscribe to our newsletter to receive the latest announcements, event updates, and exciting news directly
            in your inbox! 📧
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            variants={fadeInUp}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto"
            />
            <button className="bg-white text-background hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default AnnouncementsDisplay
