"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Shield, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
   
   
      router.replace("/login")
    

  
  }, [router])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-red-300 rounded-full opacity-30 animate-pulse delay-1000"></div>

      <motion.div className="relative z-10" initial="initial" animate="animate" variants={fadeInUp}>
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin <span className="text-background">Access</span>
            </h1>

            {/* Loading Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-6 h-6 text-background animate-spin" />
                <p className="text-gray-600 font-medium">Redirecting to login...</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-red-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-background to-background rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Skip Option */}
              <button
                onClick={() => router.replace("/login")}
                className="inline-flex items-center space-x-1 text-sm tex-background hover:text-background font-medium transition-colors duration-200 hover:underline mt-4"
              >
                <span>Skip waiting</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-3 bg-gray-100 rounded-lg border border-red-100">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                <Shield className="w-3 h-3 text-red-500" />
                <span>Secure authentication required</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
