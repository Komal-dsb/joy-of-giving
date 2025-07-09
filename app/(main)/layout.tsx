import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import { Navigation } from "@/components/navigation"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
})

export const metadata: Metadata = {
  title: {
    default: "Joy of Giving - Making a Difference Together",
    template: "%s | Joy of Giving",
  },
  description:
    "Join Joy of Giving in our mission to create positive change in communities worldwide. Donate, volunteer, and be part of something meaningful.",
  keywords: ["charity", "donation", "volunteer", "community", "giving", "nonprofit"],
  authors: [{ name: "Joy of Giving" }],
  creator: "Joy of Giving",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joyofgiving.org",
    siteName: "Joy of Giving",
    title: "Joy of Giving - Making a Difference Together",
    description: "Join Joy of Giving in our mission to create positive change in communities worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joy of Giving - Making a Difference Together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joy of Giving - Making a Difference Together",
    description: "Join Joy of Giving in our mission to create positive change in communities worldwide.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org markup for charity organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Joy of Giving",
              alternateName: "JOG",
              url: "https://joyofgiving.org",
              logo: "https://joyofgiving.org/logo.png",
              description:
                "A nonprofit organization dedicated to creating positive change in communities worldwide through charitable giving and volunteer work.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Charity Lane",
                addressLocality: "Hope City",
                addressRegion: "HC",
                postalCode: "12345",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "info@joyofgiving.org",
              },
              sameAs: [
                "https://facebook.com/joyofgiving",
                "https://twitter.com/joyofgiving",
                "https://instagram.com/joyofgiving",
              ],
            }),
          }}
        />
      </head>
      <body className={poppins.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <AnnouncementBar />
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
          <Toaster />
      </body>
    </html>
  )
}
