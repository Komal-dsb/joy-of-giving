// app/announcements/[id]/page.tsx
import ClientAnnouncement from "@/components/clientAnnouncement";

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  // Use server fetch for SEO metadata
  const { supabase } = await import("@/lib/supabase");
  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !announcement) {
    return {
      title: "Announcement Not Found | Joy of Giving",
      description: "The announcement you are looking for does not exist on Joy of Giving.",
      robots: "noindex, nofollow",
    };
  }

  const title = `${announcement.title} | Joy of Giving`;
  const description = announcement.description?.slice(0, 160) || "Discover the latest announcement from Joy of Giving.";
  const image = announcement.brochure_url || "joy-givingLogo.png";
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/announcements/${id}`;

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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
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

export default function Page({ params }: Props) {
  return <ClientAnnouncement id={params.id} />;
}
