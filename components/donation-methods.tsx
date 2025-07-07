"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Smartphone, Building, QrCode } from "lucide-react"
import Image from "next/image" 

export function DonationMethods() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How to Donate</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the donation method that works best for you. All donations are secure and go directly to our
            programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-red-600" />
                  <CardTitle className="text-2xl">Bank Transfer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-6">Make a direct bank transfer using the details below:</p>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Bank Name:</span>
                    <span className="text-gray-900">Yes Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Account Name:</span>
                    <span className="text-gray-900">Joy of Giving Foundation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Account Number:</span>
                    <span className="text-gray-900 font-mono">1234567890</span>
                  </div>
                 
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">IFSC code:</span>
                    <span className="text-gray-900 font-mono">YESB0000109</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Branch::</span>
                    <span className="text-gray-900 font-mono">Mohali, Punjab</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Please include your name and email in the transfer reference so we can
                    send you a donation receipt.
                  </p>
                </div>

               
              </CardContent>
            </Card>
          </motion.div>

          {/* QR Code & Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <QrCode className="h-8 w-8 text-red-600" />
                  <CardTitle className="text-2xl">Quick Donate</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">Scan the QR code below with your mobile banking app or payment app:</p>

                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <Image
                      src="/fakeQr.jpg"
                      alt="Donation QR Code"
                      width={200}
                      height={200}
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Or use these mobile payment options:</p>

                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <span className="font-medium">GooglePay</span>
                      </div>
                      <span className="text-gray-600"> test@upi</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">PhonePay</span>
                      </div>
                      <span className="text-gray-600"> test@upi</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Paytm</span>
                      </div>
                      <span className="text-gray-600"> test@upi</span>
                    </div>
                  </div>
                </div>

              
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Tax Deductible Donations</h3>
            <p className="text-green-700">
              Joy of Giving is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the
              full extent allowed by law. Tax ID: 12-3456789
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
