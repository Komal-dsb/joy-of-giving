import type { Metadata } from "next"
import { AboutHero } from "@/components/about-hero"
import { MissionVision } from "@/components/mission-vision"
import { TeamSection } from "@/components/team-section"
import { TimelineSection } from "@/components/timeline-section"
import { ValuesSection } from "@/components/values-section"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Joy of Giving's mission, values, and the dedicated team working to create positive change worldwide.",
}

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <AboutHero />
      <MissionVision />
      <ValuesSection />
      <TeamSection />
      <TimelineSection />
    </div>
  )
}
