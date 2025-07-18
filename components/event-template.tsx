"use client";

import { FC } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnnouncementFormData } from "@/components/types/announcement";
import ShareButtons from "@/components/share-button";
import { Calendar, MapPin, Share2 } from "lucide-react";

interface EventTemplateProps {
  announcement: AnnouncementFormData;
  url: string;
  title: string;
}

const EventTemplate: FC<EventTemplateProps> = ({
  announcement,
  url,
  title,
}) => (
  <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
    <Card className="overflow-hidden py-0 shadow-2xl rounded-3xl border-0 bg-gray-50">
      {announcement.brochure_url && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          <Image
            src={announcement.brochure_url}
            alt={announcement.title}
            height={700}
            width={1200}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="pt-8 px-4 sm:px-6 md:px-8">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-base bg-clip-text text-transparent leading-tight">
          {announcement.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 md:px-8 pb-8 space-y-8">
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium">
          {announcement.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border-2 border-gray-100 bg-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-base sm:text-lg">
                  Venue
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                {announcement.eventVenue}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-base sm:text-lg">
                  Event Date
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                {announcement.eventDate}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Share2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                  Share this event
                </h3>
                <p className="text-sm text-gray-600">
                  Spread the word with your network
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <ShareButtons url={url} title={title} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default EventTemplate;
