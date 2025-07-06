import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { FeaturedPrograms } from "@/components/featured-programs"
import { ImpactStats } from "@/components/impact-stats"
import { LatestAnnouncements } from "@/components/latest-announcements"
import { CallToAction } from "@/components/call-to-action"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Joy of Giving - Making a difference in communities worldwide through charitable giving and volunteer work.",
}

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <MissionSection />
      <FeaturedPrograms />
      <ImpactStats />
      <LatestAnnouncements />
      <CallToAction />
    </div>
  )
}
