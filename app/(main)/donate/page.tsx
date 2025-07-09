import type { Metadata } from "next"
import { DonationHero } from "@/components/donation-hero"
import { DonationMethods } from "@/components/donation-methods"
import { DonationImpact } from "@/components/donation-impact"
import { DonationFAQ } from "@/components/donation-faq"

export const metadata: Metadata = {
  title: "Donate",
  description: "Make a difference today. Your donation helps us create positive change in communities worldwide.",
}

export default function DonatePage() {
  return (
    <div className="space-y-0">
      <DonationHero />
      <DonationMethods />
      <DonationImpact />
      <DonationFAQ />
    </div>
  )
}
