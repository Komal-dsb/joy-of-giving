"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import galleryItems from "@/components/gallery-images";
import { Button } from "@/components/ui/button";


type GalleryItem = {
  id: number;
  type: "image" | "video";
  src: string;

  category: string;
};

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState("all");

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  

  const categories = [
    { id: "all", label: "All" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "food", label: "Nutrition and Aid" },
    { id: "volunteers", label: "Volunteers" },
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
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 pt-20 pb-32">
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
              Our <span className="text-background">Gallery</span>
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
                    ? "bg-background text-white shadow-lg"
                    : "text-white hover:text-background hover:border-background"
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
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid overflow-hidden rounded-lg"
              >
                <Image
                  src={item.src}
                  alt={item.category}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  onClick={() => openModal(item)}
                  style={{ cursor: "pointer" }}
                />
              </div>
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
                alt={selectedMedia.category}
                height={600}
                width={300}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
