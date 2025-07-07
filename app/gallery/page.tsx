"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GalleryItem = {
  id: number;
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState("all");

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const galleryItems:GalleryItem[] = [
    {
      id: 1,
      type: "image",
      src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
      title: "Children's Education Program",
      description:
        "Students in Guatemala receiving new school supplies and textbooks",
      category: "education",
      date: "March 2024",
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      title: "Mobile Health Clinic",
      description: "Providing essential healthcare services in rural Kenya",
      category: "healthcare",
      date: "February 2024",
    },
    {
      id: 3,
      type: "image",
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=400&fit=crop",
      title: "Clean Water Project",
      description:
        "New water well installation bringing clean water to remote villages",
      category: "water",
      date: "January 2024",
    },
    {
      id: 4,
      type: "video",
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
      title: "Community Center Opening",
      description: "Grand opening ceremony of our new community center in Peru",
      category: "community",
      date: "March 2024",
    },
    {
      id: 5,
      type: "image",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      title: "Volunteer Training",
      description:
        "Training session for new volunteers joining our education program",
      category: "volunteer",
      date: "February 2024",
    },
    {
      id: 6,
      type: "image",
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
      title: "Disaster Relief Efforts",
      description:
        "Emergency response team providing aid after natural disaster",
      category: "relief",
      date: "January 2024",
    },
    {
      id: 7,
      type: "video",
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop",
      title: "Success Stories Documentary",
      description:
        "Interviews with beneficiaries sharing their transformation stories",
      category: "stories",
      date: "March 2024",
    },
    {
      id: 8,
      type: "image",
      src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop",
      title: "Agricultural Training",
      description:
        "Teaching sustainable farming techniques to local communities",
      category: "agriculture",
      date: "February 2024",
    },
    {
      id: 9,
      type: "image",
      src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=600&h=400&fit=crop",
      title: "Women's Empowerment Workshop",
      description:
        "Skills training and microfinance program for women entrepreneurs",
      category: "empowerment",
      date: "January 2024",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "water", label: "Clean Water" },
    { id: "community", label: "Community" },
    { id: "volunteer", label: "Volunteers" },
    { id: "stories", label: "Stories" },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const openModal = (item: GalleryItem) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
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
              Our <span className="text-red-600">Gallery</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeInUp}
            >
              Capturing moments of transformation, hope, and community. Explore
              the visual story of our impact around the world.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white border-b">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  filter === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:border-blue-600"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Card
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => openModal(item)}
                >
                  <div className="relative">
                    <Image
                      src={item.src}
                      alt={item.title}
                      height={600}
                      width={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      {item.type === "video" ? (
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      ) : null}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          item.type === "video" ? "bg-red-500" : "bg-blue-500"
                        }`}
                      >
                        {item.type === "video" ? "Video" : "Photo"}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <p className="text-gray-400 text-xs">{item.date}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-video">
              <Image
                src={selectedMedia.src}
                alt={selectedMedia.title}
                height={600}
                width={300}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMedia.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {selectedMedia.description}
              </p>
              <p className="text-gray-400 text-sm">{selectedMedia.date}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
