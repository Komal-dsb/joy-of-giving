"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image" // Import Next.js Image

// TODO: Replace with Supabase query
const featuredPrograms = [
  {
    id: 1,
    title: "Education for All",
    description: "Providing quality education and learning resources to underserved communities worldwide.",
    image: "/educationH.jpg",
    impact: "10,000+ children educated",
    category: "Education",
  },
  {
    id: 2,
    title: "Health",
    description: "Our commitment to healthcare reflects our dedication to compassion, solidarity, and creating lasting change.",
    image: "/healthH.jpg",
    impact: "5000+ people helped",
    category: "Health",
  },
  {
    id: 3,
    title: "Nutrition and Aid",
    description: "Our commitment to nutrition and aid reflects a dedication to combating food insecurity, and  community resilience.  ",
    image: "/nutritionH.jpg",
    impact: "25,000+ people helped",
    category: "Nutrition and Aid",
  },
]

export function FeaturedPrograms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold txt-base mb-6">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we&apos;re making a difference through our targeted programs designed to address the most pressing
            needs in communities worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    width={300}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1">
                    <span className="bg-base text-white px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium txt-base">{program.impact}</span>
                    <Button variant="ghost" size="sm" className="txt-base hover:txt-base">
                      Learn More
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
          <Button size="lg" className="hover:bg-background bg-base hover:text-foreground" variant="outline" asChild>
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
