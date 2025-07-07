"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const timelineEvents = [
  {
    year: "2018",
    title: "Foundation Established",
    description: "Joy of Giving was founded with a mission to create lasting positive change in communities worldwide.",
    milestone: "Organization Founded",
  },
  {
    year: "2019",
    title: "First International Program",
    description: "Launched our first education program in rural area, serving 500 children.",
    milestone: "500 Children Served",
  },
  {
    year: "2020",
    title: "Emergency Response",
    description: "Rapidly pivoted to provide COVID-19 relief, distributing supplies and supporting healthcare systems.",
    milestone: "10,000 Families Helped",
  },
  {
    year: "2021",
    title: "Nutrition and Aid",
    description: "Nutrition and aid go beyond merely providing meals; they ensure that everyone has access to essential resources for a healthy life.",
    milestone: "5000+ people helped",
  },
  {
    year: "2022",
    title: "Healthcare Expansion",
    description: "Introduced mobile healthcare clinics, providing medical services to remote communities.",
    milestone: "15,000 Patients Treated",
  },
  {
    year: "2023",
    title: "Major Milestone",
    description: "Reached 100,000 lives impacted across nation, with 2,000 active volunteers.",
    milestone: "100K Lives Impacted",
  },
  {
    year: "2024",
    title: "Continued Growth",
    description: "Expanding programs and reaching new communities while maintaining our commitment to transparency.",
    milestone: "125K+ Lives Impacted",
  },
]

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to global impact, see how we&aposve grown and the milestones we&aposve achieved together.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-red-200"></div>

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-red-600 mr-3">{event.year}</span>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {event.milestone}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
