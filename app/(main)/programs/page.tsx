"use client";
import { motion } from "framer-motion";
import { BookOpen, Heart, Utensils, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Color palette and gradients aligned with About page
const GRADIENT_BG = "bg-gradient-to-br from-red-50 to-red-100";
const SECTION_BG = "bg-white";
const ACCENT_GRADIENTS = [
  "from-indigo-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-cyan-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-green-600",
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const programs = [
  {
    icon: BookOpen,
    title: "Education First",
    subtitle: "Building brighter futures through learning",
    description:
      "Our comprehensive education program provides school supplies, scholarships, and learning resources to children in underserved communities. Education is the foundation for breaking cycles of poverty.",
    image:
      "/educationP.jpg",
    impact: "2,500+ children supported",
    color: ACCENT_GRADIENTS[0],
  },
  {
    icon: Heart,
    title: "Healthcare Access",
    subtitle: "Bringing medical care to those in need",
    description:
      "Mobile clinics and medical camps provide essential healthcare services to remote and underserved areas. From checkups to emergency care, we ensure no one is left without medical attention.",
    image:
      "/healthP.jpg",
    impact: "15,000+ patients treated",
    color: ACCENT_GRADIENTS[1],
  },
  {
    icon:  Utensils,
    title: "Nutrition and Aid",
    subtitle: "We address nutrition and aid through a variety of initiatives",
    description:
      "Each month, we host food camps to distribute nutritious meals and groceries to those in need. During the winter, we extend our support by providing blankets and mattresses to help the homeless and impoverished stay warm and comfortable.",
    image:
      "/foodP.jpg",
    impact: "5000+ prople helped",
    color: ACCENT_GRADIENTS[2],
  },
 
  {
    icon: Users,
    title: "Disaster Response",
    subtitle: "Disaster response goes beyond emergency aid",
    description:
      "We understand that disaster response is vital for ensuring the safety, recovery, and well-being of affected communities. Natural disasters can leave lasting impacts, especially on vulnerable populations, and our efforts aim to provide immediate relief and long-term support to rebuild lives.",
    image:
      "/disasterP.jpg",
    impact: "1,000+ people trained",
    color: ACCENT_GRADIENTS[4],
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`${GRADIENT_BG} pt-20 pb-28`}>
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight"
              variants={fadeInUp}
            >
              Our <span className="text-red-600">Programs</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed mb-2"
              variants={fadeInUp}
            >
              Targeted initiatives designed to create lasting change in
              communities worldwide. Each program is crafted to address real
              needs and deliver sustainable impact.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Programs Grid */}
      <section className={`${SECTION_BG} py-16`}>
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
        >
          <div className="space-y-20">
            {programs.map((program, idx) => (
              <motion.div
                key={program.title}
                variants={fadeInUp}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                    <Image
                      src={program.image}
                      alt={program.title}
                      width={600} 
                      height={320}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${program.color} opacity-20 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                      <p className="text-lg font-semibold">{program.impact}</p>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div
                  className={`space-y-6 ${
                    idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${program.color} text-white mb-4 shadow-lg`}
                  >
                    <program.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-lg text-indigo-600 font-medium mb-3">
                      {program.subtitle}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {program.description}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${program.color} hover:opacity-90 text-white px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105`}
                  >
                    Support This Program
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-4xl font-bold mb-6 tracking-tight"
            variants={fadeInUp}
          >
            Ready to Make an Impact?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Choose a program that speaks to your heart and help us create
            lasting change in communities that need it most.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="bg-white text-red-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold"
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-red-700 px-8 py-4 text-lg rounded-full font-semibold"
            >
              Volunteer With Us
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
