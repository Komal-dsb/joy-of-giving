"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

// TODO: Replace with Supabase query for latest announcements
const announcements = [
  {
    id: 1,
    title: "Emergency Relief Fund for Flood Victims",
    excerpt:
      "We are launching an emergency relief fund to help families affected by recent floods. Your immediate support can provide shelter, food, and medical aid.",
    date: "2024-01-15",
    category: "Emergency",
    isUrgent: true,
  },
  {
    id: 2,
    title: "New School Opens in Rural Kenya",
    excerpt:
      "Thanks to your generous donations, we have successfully opened a new primary school serving 300 children in rural Kenya.",
    date: "2024-01-10",
    category: "Education",
    isUrgent: false,
  },
  {
    id: 3,
    title: "Volunteer Appreciation Event",
    excerpt:
      "Join us for our annual volunteer appreciation event on February 14th. Celebrate the amazing work of our volunteer community.",
    date: "2024-01-08",
    category: "Event",
    isUrgent: false,
  },
]

export function LatestAnnouncements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Latest Updates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about our latest initiatives, success stories, and urgent appeals for support.
          </p>
        </motion.div>

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
                    {announcement.isUrgent && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">URGENT</span>
                    )}
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
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
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
      </div>
    </section>
  )
}
