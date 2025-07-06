"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const impactExamples = [
  {
    amount: 25,
    impact: "Provides school supplies for one child for a month",
    icon: "📚",
  },
  {
    amount: 50,
    impact: "Feeds a family of four for one week",
    icon: "🍽️",
  },
  {
    amount: 100,
    impact: "Provides clean water access for one person for a year",
    icon: "💧",
  },
  {
    amount: 250,
    impact: "Funds medical treatment for one patient",
    icon: "🏥",
  },
  {
    amount: 500,
    impact: "Sponsors one child's education for a full year",
    icon: "🎓",
  },
  {
    amount: 1000,
    impact: "Builds one water well serving an entire village",
    icon: "🏘️",
  },
]

export function DonationImpact() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Impact in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how your donation creates positive change. Every dollar is carefully allocated to maximize
            impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {impactExamples.map((example, index) => (
            <motion.div
              key={example.amount}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <div className="text-2xl font-bold text-red-600 mb-2">${example.amount}</div>
                  <p className="text-gray-600 leading-relaxed">{example.impact}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Fund Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How We Use Your Donations</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Programs & Services</span>
                    <span className="font-bold text-gray-900">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">Direct funding for our charitable programs and services</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Administrative Costs</span>
                    <span className="font-bold text-gray-900">10%</span>
                  </div>
                  <Progress value={10} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">Essential operational expenses and staff salaries</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Fundraising</span>
                    <span className="font-bold text-gray-900">5%</span>
                  </div>
                  <Progress value={5} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">Costs associated with raising funds for our programs</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-center font-medium">
                  🏆 We&aposre proud to maintain one of the highest program expense ratios in the nonprofit sector
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
