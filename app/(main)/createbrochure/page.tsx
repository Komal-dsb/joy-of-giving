"use client"

import { Sparkles, Upload, Wand2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AIBrochureGenerator() {
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
        

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Brochure{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Designer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Just provide your event details and let AI create stunning, professional brochure templates for you! ✨
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tell Us About Your Event</CardTitle>
              <CardDescription className="text-base">
                Provide your event details and we&aposll generate AI-powered brochure templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold">
                  Event Title *
                </Label>
                <Input id="title" placeholder="e.g., Future Tech Conference 2025" className="h-12 text-base" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">
                  Event Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event, its purpose, what attendees will learn or experience..."
                  className="min-h-[120px] text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-base font-semibold">
                    Venue *
                  </Label>
                  <Input id="venue" placeholder="e.g., City Convention Center" className="h-12 text-base" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-base font-semibold">
                    Event Date *
                  </Label>
                  <Input id="date" type="date" className="h-12 text-base" />
                </div>
              </div>

                 <div className="space-y-2">
                <Label htmlFor="image" className="text-base font-semibold">
                  Event Image (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="h-12 text-base file:mr-4 file:mt-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-red-600 file:to-orange-600 file:text-white hover:file:from-red-700 hover:file:to-orange-700"
                  />
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload an image to enhance your brochure design (JPG, PNG, WebP)
                  </div>
                </div>
              </div>

              <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Wand2 className="w-5 h-5 mr-2" />
                Create Your Brochure with AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
