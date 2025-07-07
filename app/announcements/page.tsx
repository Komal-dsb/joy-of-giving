"use client";
import { motion } from "framer-motion";
import { Calendar, AlertCircle, Heart, Users, Megaphone } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";

const Announcements = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const announcements = [
    {
      id: 1,
      type: "urgent",
      title: "Emergency Relief Fund for Flood Victims",
      excerpt:
        "Immediate assistance needed for families affected by recent flooding in South Asia. Your urgent support can provide shelter, food, and medical aid.",
      content:
        "Recent flooding in South Asia has displaced thousands of families, leaving them without homes, clean water, or access to medical care. Our emergency response team is on the ground providing immediate assistance, but we need your help to reach more families in need.",
      date: "2024-03-15",
      author: "Emergency Response Team",
      image:
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=300&fit=crop",
      tags: ["Emergency", "Relief", "Urgent"],
    },
    {
      id: 2,
      type: "event",
      title: "Annual Charity Gala - 'Hope in Action'",
      excerpt:
        "Join us for an evening of inspiration, celebration, and fundraising. Meet the people whose lives have been transformed by your generosity.",
      content:
        "Our annual charity gala brings together supporters, volunteers, and beneficiaries for a night of celebration and hope. This year&aposs theme, 'Hope in Action,' highlights the incredible impact we&aposve achieved together and our vision for the future.",
      date: "2024-04-20",
      author: "Events Team",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=300&fit=crop",
    
    },
    {
      id: 3,
      type: "program",
      title: "New Mobile Clinic Program Launches in Rural Peru",
      excerpt:
        "Our latest healthcare initiative brings medical services to remote communities in the Andes Mountains, serving over 5,000 people.",
      content:
        "We&aposre excited to announce the launch of our newest mobile clinic program in rural Peru. This initiative will provide essential healthcare services to indigenous communities in the Andes Mountains who previously had to travel days to reach the nearest medical facility.",
      date: "2024-03-10",
      author: "Healthcare Team",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
     
    },
    {
      id: 4,
      type: "volunteer",
      title: "Volunteer Appreciation Week",
      excerpt:
        "Celebrating our amazing volunteers who make everything we do possible. Thank you for your dedication and compassion.",
      content:
        "This week, we&aposre celebrating the incredible contributions of our 500+ volunteers worldwide. From education programs to disaster relief, our volunteers are the heart of everything we do. Their dedication, compassion, and tireless efforts make lasting change possible.",
      date: "2024-03-08",
      author: "Volunteer Coordination",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop",
   
    },
    {
      id: 5,
      type: "milestone",
      title: "Milestone: 10,000 Children Supported Through Education Programs",
      excerpt:
        "We&aposve reached an incredible milestone - 10,000 children have now received educational support through our programs worldwide.",
      content:
        "Today marks a significant milestone in our mission: we have now provided educational support to 10,000 children across 15 countries. From school supplies and scholarships to building classrooms and training teachers, we&aposre creating lasting change in education.",
      date: "2024-03-05",
      author: "Education Team",
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=300&fit=crop",
     
    },
    {
      id: 6,
      type: "news",
      title: "Partnership Announcement: Clean Water Initiative Expansion",
      excerpt:
        "New partnership with local NGOs will help us install 50 more water wells across sub-Saharan Africa in the next 12 months.",
      content:
        "We&aposre thrilled to announce a new partnership that will significantly expand our Clean Water Initiative. Working with established local NGOs, we plan to install 50 additional water wells across sub-Saharan Africa, bringing clean water access to an estimated 25,000 more people.",
      date: "2024-03-01",
      author: "Partnerships Team",
      image:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=300&fit=crop",
     
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return AlertCircle;
      case "event":
        return Calendar;
      case "volunteer":
        return Users;
      case "milestone":
        return Heart;
      default:
        return Megaphone;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200";
      case "event":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "volunteer":
        return "bg-green-100 text-green-700 border-green-200";
      case "milestone":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-red-100 pt-20 pb-32">
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
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Latest <span className="text-red-600">News</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeInUp}
            >
              Stay updated with our latest programs, events, milestones, and
              urgent appeals. Be the first to know about the impact we&aposre
              creating together.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Featured Announcement */}
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
              <Card className="overflow-hidden border-0 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={announcements[0].image}
                      alt={announcements[0].title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover min-h-96"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${getTypeColor(announcements[0].type)}`}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        FEATURED
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      <span className="text-red-600 font-semibold uppercase text-sm">
                        Urgent Appeal
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {announcements[0].title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {announcements[0].content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <span>{formatDate(announcements[0].date)}</span>
                      <span>By {announcements[0].author}</span>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg self-start">
                      Donate Now
                    </button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* All Announcements */}
      <section className="py-20 bg-red-50">
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
            All Announcements
          </motion.h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {announcements.slice(1).map((announcement) => {
              const IconComponent = getTypeIcon(announcement.type);

              return (
                <motion.div key={announcement.id} variants={fadeInUp}>
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={announcement.image}
                        alt={announcement.title}
                         width={600}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getTypeColor(announcement.type)}`}>
                          <IconComponent className="w-4 h-4 mr-1" />
                          {announcement.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {announcement.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                       
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(announcement.date)}</span>
                        <span>By {announcement.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
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
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Subscribe to our newsletter to receive the latest updates, stories,
            and urgent appeals directly in your inbox.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            variants={fadeInUp}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto"
            />
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Announcements;
