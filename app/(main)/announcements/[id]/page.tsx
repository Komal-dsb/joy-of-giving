
import { supabase } from "@/lib/supabase";
import { AnnouncementFormData } from "@/components/types/announcement";
import EventTemplate from "@/components/event-template";
export const dynamic = "force-dynamic";
import type { Metadata } from 'next';


type Props ={
  params: Promise<{id:string}
  >
}


const getAnnouncement = async (id: string) => {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export async function generateMetadata({ params }:Props):Promise<Metadata>  {
  let announcement: AnnouncementFormData | null = null;
  try {
    announcement = await getAnnouncement((await params).id);
  } catch (e) {console.log(e)}

  if (!announcement) {
    return {
      title: "Announcement Not Found | Joy of Giving",
      description: "The announcement you are looking for does not exist on Joy of Giving.",
      robots: "noindex, nofollow",
    };
  }

  // Dynamic values
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/announcements/${(await params).id}`; 
  const title = `${announcement.title} | Joy of Giving`;
  const description = announcement.description?.slice(0, 160) || "Discover the latest announcement from Joy of Giving.";
  const image = announcement.brochure_url || "joy-givingLogo.png"; 

  return {
    title,
    description,
    keywords: announcement.keywords || "announcement, joy of giving, events, charity, social work", 
    authors: [{ name: announcement.author || "Joy of Giving" }],
    creator: announcement.author || "Joy of Giving",
    publisher: "Joy of Giving",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Joy of Giving",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@your_twitter_handle", 
      site: "@your_twitter_handle",
    },
    robots: "index, follow",
  };
}



async function AnnouncementDetailPage({
  params,
}:Props) {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/announcements/${(await params).id}`;
  const title = "Check out this awesome page!";

  let announcement: AnnouncementFormData;
  try {
    announcement = await getAnnouncement((await params).id);
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold text-red-600">Error loading announcement</h1>
        <pre className="text-sm bg-gray-100 p-4 mt-2 rounded">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!announcement) {
    return <div className="p-8">Announcement not found.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-red-50 py-20 px-4 md:px-8">
      <main className="flex flex-col items-center justify-center bg-red-50">
        <EventTemplate announcement={announcement} url={url} title={title} />
      </main>
    </div>
  );
}

export default AnnouncementDetailPage;
