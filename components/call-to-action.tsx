"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users } from "lucide-react"

export function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl md:text-2xl text-red-100 mb-12 leading-relaxed">
            Your support can transform lives and build stronger communities. Join thousands of compassionate individuals
            making a real impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            >
              <Heart className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-semibold mb-4">Donate Today</h3>
              <p className="text-red-100 mb-6">
                Every donation, no matter the size, creates ripples of positive change in communities that need it most.
              </p>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/donate">Make a Donation</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            >
              <Users className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-semibold mb-4">Volunteer With Us</h3>
              <p className="text-red-100 mb-6">
                Share your time, skills, and passion to directly impact lives and be part of our growing community of
                changemakers.
              </p>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/volunteer">Join Our Team</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-red-100 text-lg">
              Questions? We&aposd love to hear from you.{" "}
              <Link href="/contact" className="underline hover:no-underline font-semibold">
                Get in touch
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
