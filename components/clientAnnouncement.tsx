"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnnouncementFormData } from "@/components/types/announcement";
import EventTemplate from "@/components/event-template";
import { toast } from "sonner"; 

export default function ClientAnnouncement({ id }: { id: string }) {
  const [announcement, setAnnouncement] = useState<AnnouncementFormData | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Failed to load announcement", {
          description: error.message || "Please try again later.",
        });
      } else {
        setAnnouncement(data);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (!announcement) {
    return <div className="p-8">Loading...</div>;
  }

  const title = "Check out this awesome page!";
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/announcements/${id}`;

  return (
    <div className="w-full min-h-screen bg-gray-50 py-20 px-4 md:px-8">
      <main className="flex flex-col items-center justify-center bg-gray-50">
        <EventTemplate announcement={announcement} url={url} title={title} />
      </main>
    </div>
  );
}
