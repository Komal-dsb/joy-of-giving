"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Users, Lightbulb, Globe, Heart, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We lead with empathy and understanding, putting the needs of others at the heart of everything we do.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest standards of honesty, transparency, and accountability in all our actions.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective action and building strong, supportive communities.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our reach extends worldwide, creating positive change across diverse communities and cultures.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace creative solutions and innovative approaches to address complex social challenges.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, continuously improving our programs and services.",
  },
]

export function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These values guide every decision we make and every action we take in our mission to create positive change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <value.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
