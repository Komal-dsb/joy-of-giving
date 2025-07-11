"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnnouncementFormData } from "@/components/types/announcement";
import ShareButtons from "@/components/share-button";
import { Calendar, MapPin, Share2 } from "lucide-react";

interface EventTemplateProps {
  announcement: AnnouncementFormData;
  url: string;
  title: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const EventTemplate: FC<EventTemplateProps> = ({
  announcement,
  url,
  title,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-4xl mx-auto"
  >
    <Card className="overflow-hidden shadow-2xl rounded-3xl border-0 bg-gradient-to-br from-white to-gray-50/50">
      {announcement.brochure_url && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          <Image
            src={announcement.brochure_url}
            alt={announcement.title}
            height={700}
            width={500}
            className="w-full h-[600px] object-fill  transition-transform duration-700 hover:scale-105 rounded-xl"
          />

       
        </motion.div>
      )}

      <CardHeader className="pb-6 pt-8 px-8">
        <motion.div variants={fadeIn}>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent leading-tight">
            {announcement.title}
          </CardTitle>
        </motion.div>
      </CardHeader>

      <CardContent className="px-8 pb-8 space-y-8">
        <motion.div variants={fadeIn} initial="initial" animate="animate">
          <motion.div variants={fadeIn}>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
              {announcement.description}
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <Card className="border-2 border-red-100 bg-gradient-to-br from-red-50 to-red-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500 rounded-full">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-800 text-lg">Venue</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium text-base">
                  {announcement.event_venue}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-full">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-800 text-lg">
                    Event Date
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium text-base">
                  {announcement.event_date}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="pt-8">
            <div className="flex-col gap-4 items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <Share2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Share this event</h3>
                  <p className="text-sm text-gray-600">
                    Spread the word with your network
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <ShareButtons url={url} title={title} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export default EventTemplate;
