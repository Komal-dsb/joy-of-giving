"use client";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Heart,
  Award,
  Quote,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

const Impact = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const testimonials = [
    {
      name: "Harvinder ",
      location: "Mohali",
      story:
        "Thanks to the Joy of Giving team for supporting education for those in need. Our children now have access to quality learning opportunities and resources, helping them build a brighter future. We are truly grateful for your support—it has made a real difference in our lives.",
      image: "/educationP.jpg",
      program: "Education First",
    },
    {
      name: "Ahmed Hassan",
      location: "Mohali",
      story:
        "Thanks to the Joy of Giving team for bringing the health clinic and blood donation camps to our village. Our children are healthier, and knowing that help is available in emergencies gives us peace of mind. We are truly grateful for your support—it has changed our lives for the better.",
      image: "/healthH.jpg",
      program: "Health center Initiative",
    },
    {
      name: "Priya Sharma",
      location: "India",
      story:
        "Thanks to the Joy of Giving team for providing nutrition aid to those in need. Our families now have access to healthier food, and our children are growing stronger and no longer suffer from malnutrition. We are truly grateful for your support—it has made a real difference in our lives.",
      image: "/disasterP.jpg",
      program: "Healthcare Access",
    },
  ];

  const impactStats = [
    {
      icon: Users,
      number: "25,847",
      label: "Lives Directly Impacted",
      description:
        "Individuals who have received direct assistance through our programs",
    },
    {
      icon: Heart,
      number: "152",
      label: "Communities Served",
      description:
        "Villages and neighborhoods where we've implemented sustainable programs",
    },
    {
      icon: Award,
      number: "89%",
      label: "Program Success Rate",
      description:
        "Percentage of programs that achieved their intended long-term outcomes",
    },
    {
      icon: TrendingUp,
      number: "2.4M",
      label: "Funds Deployed",
      description:
        "Total value of aid and resources delivered to communities in need",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 py-20 to-gray-100 pt-10 pb-10 lg:pt-4 lg:pb-4">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between ">
            {/* Image Section */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center md:justify-start  transform md:-translate-x-[50%]"
            >
              <div className="w-[300px] h-[300px]  lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/educationP.jpg"
                  alt="Impact"
                  width={500}
                  height={500}
                  className="object-fit w-full h-full"
                />
              </div>
            </motion.div>

            {/* Text Section */}
            <div className="text-center pt-10 lg:pt-0 md:text-left flex-1 space-y-6">
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-gray-900"
                variants={fadeInUp}
              >
                Our <span className="txt-base">Impact</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                variants={fadeInUp}
              >
                Real stories of transformation, measurable outcomes, and lasting
                change. Discover how your support creates ripples of positive
                impact across communities worldwide.
              </motion.p>
              <a
                href="#stories"
                className="inline-flex items-center gap-2 p-4 bg-base text-white rounded-md  font-sm hover:bg-base transition"
              >
                Read Stories
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-16 text-center"
            variants={fadeInUp}
          >
            Impact by Numbers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="pt-6">
                    <stat.icon className="w-12 h-12 txt-base mx-auto mb-6" />
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-lg font-semibold txt-base mb-3">
                      {stat.label}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="py-20 bg-gray-100">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2
            className="text-4xl font-bold txt-base mb-4 text-center"
            variants={fadeInUp}
          >
            Stories of Hope
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Behind every statistic is a human story. Meet some of the people
            whose lives have been transformed through our programs.
          </motion.p>

          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Card className="border-0 shadow-xl overflow-hidden">
                    <CardContent className="p-8">
                      <Quote className="w-12 h-12 txt-base mb-6" />
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                        &quot;{testimonial.story}&quot;
                      </blockquote>

                      <div className="flex items-center space-x-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <p className="font-bold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-600">
                            {testimonial.location}
                          </p>
                          <p className="txt-base text-sm font-medium">
                            {testimonial.program}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div
                  className={`${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <Image
                    src={`/images/photo-${index}.jpg`}
                    alt={`Photo ${index}`}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Program Outcomes */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-4xl font-bold txt-base mb-16 text-center"
            variants={fadeInUp}
          >
            Program Outcomes
          </motion.h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                program: "Education First",
                outcomes: [
                  "2,500+ children provided with school supplies",
                  "85% improvement in literacy rates",
                  "150 scholarships awarded",
                  "50 schools equipped with learning materials",
                ],
                color: "border-blue-500",
              },
              {
                program: "Healthcare Access",
                outcomes: [
                  "15,000+ patients treated in mobile clinics",
                  "95% success rate in treating preventable diseases",
                  "30 permanent health facilities established",
                  "500+ healthcare workers trained",
                ],
                color: "border-red-500",
              },
              {
                program: "Nutrition and Aid",
                outcomes: [
                  "50+ community nutrition programs launched",
                  "25,000+ individuals gained access to nutritious food and essential aid",
                  "80% improvement in food security among participating households",
                  "100+ nutrition assistance and food distribution centers established",
                ],
                color: "border-cyan-500",
              },
            ].map((program, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`border-l-4 ${program.color} shadow-lg hover:shadow-xl transition-shadow duration-300 h-full`}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {program.program}
                    </h3>
                    <ul className="space-y-3">
                      {program.outcomes.map((outcome, outcomeIndex) => (
                        <li
                          key={outcomeIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-base rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-base text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            Be Part of Our Next Success Story
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Every donation, every volunteer hour, every act of kindness
            contributes to these transformative outcomes. Join us in creating
            more stories of hope and positive change.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <button className="bg-white txt-base hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              Support Our Mission
            </button>
            <button className="border-2 border-white text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300">
              Volunteer Today
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Impact;
