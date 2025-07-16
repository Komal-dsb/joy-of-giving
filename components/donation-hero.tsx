"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Award } from "lucide-react"

const trustIndicators = [
  {
    icon: Shield,
    title: "Secure Donations",
    description: "Your donations are processed securely",
  },
  {
    icon: Award,
    title: "Transparent Impact",
    description: "See exactly how your money is used",
  },
  {
    icon: Heart,
    title: "Direct Impact",
    description: "95% of donations go directly to programs",
  },
]

export function DonationHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold txt-base mb-6">
            Your Generosity
            <span className="txt-base-600 block">Changes Lives</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Every donation creates a ripple effect of positive change. Join thousands of supporters making a real
            difference in communities worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <indicator.icon className="h-8 w-8 txt-base" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{indicator.title}</h3>
              <p className="text-gray-600">{indicator.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
