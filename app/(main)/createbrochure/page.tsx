"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Upload, Wand2, Loader2, CheckCircle, AlertCircle} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"

interface AIBrochureFormData {
  title: string
  description: string
  venue: string
  date: string
  image: File | null
}

interface AIBrochureResponse {
  success: boolean
  imageUrl?: string
  brochureData?: {
    title: string
    description: string
    venue: string
    date: string
    generatedImageUrl: string
  }
  error?: string
}

export default function AIBrochureGenerator() {
  const router = useRouter()
  const [formData, setFormData] = useState<AIBrochureFormData>({
    title: "",
    description: "",
    venue: "",
    date: "",
    image: null,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  // Character limits for better UX
  const TITLE_LIMIT = 100
  const DESCRIPTION_LIMIT = 1000
  const VENUE_LIMIT = 150

  const handleInputChange = (field: keyof Omit<AIBrochureFormData, "image">, value: string) => {
    let truncatedValue = value

    // Apply character limits
    if (field === "title" && value.length > TITLE_LIMIT) {
      truncatedValue = value.substring(0, TITLE_LIMIT)
    } else if (field === "description" && value.length > DESCRIPTION_LIMIT) {
      truncatedValue = value.substring(0, DESCRIPTION_LIMIT)
    } else if (field === "venue" && value.length > VENUE_LIMIT) {
      truncatedValue = value.substring(0, VENUE_LIMIT)
    }

    setFormData((prev) => ({ ...prev, [field]: truncatedValue }))

    // Clear any previous messages when user starts typing
    if (message.type) {
      setMessage({ type: null, text: "" })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null

    // Validate file size (max 10MB)
    if (file && file.size > 10 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image file size must be less than 10MB. Please choose a smaller file.",
      })
      return
    }

    // Validate file type
    if (file && !file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file (JPG, PNG, WebP).",
      })
      return
    }

    setFormData((prev) => ({ ...prev, image: file }))

    // Clear any previous messages when user selects a file
    if (message.type) {
      setMessage({ type: null, text: "" })
    }
  }

  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Please provide an exciting title for your event! ✨"
    }
    if (formData.title.trim().length < 5) {
      return "Event title should be at least 5 characters long for better impact! 📝"
    }
    if (!formData.description.trim()) {
      return "We'd love to hear more about your event in the description! 📖"
    }
    if (formData.description.trim().length < 20) {
      return "Please provide a more detailed description (at least 20 characters) to help AI create better brochures! 🎯"
    }
    if (!formData.venue.trim()) {
      return "Don't forget to tell us where this amazing event will take place! 📍"
    }
    if (!formData.date.trim()) {
      return "When is this exciting event happening? Please select a date! 📅"
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return "Event date cannot be in the past. Please select a future date! ⏰"
    }

    return null
  }

  const uploadImageToSupabase = async (imageBlob: Blob, fileName: string): Promise<string | null> => {
    console.log(fileName)
    try {
      const fileExt = "jpg" // AI API returns JPG format
      const uniqueFileName = `ai-brochures/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload to Supabase storage
      const {  error: uploadError } = await supabase.storage
        .from("announcements")
        .upload(uniqueFileName, imageBlob, {
          contentType: "image/jpeg",
          upsert: false,
        })

      if (uploadError) {
        console.error("Supabase upload error:", uploadError)
        throw new Error(`Failed to upload brochure: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("announcements").getPublicUrl(uniqueFileName)

      if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL for uploaded brochure")
      }

      return urlData.publicUrl
    } catch (error) {
      console.error("Error uploading to Supabase:", error)
      throw error
    }
  }

  const saveAnnouncementToDatabase = async (brochureUrl: string): Promise<void> => {
    try {
      const { error: dbError } = await supabase.from("announcements").insert([
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          event_venue: formData.venue.trim(),
          event_date: formData.date,
          brochure_url: brochureUrl,
        },
      ])

      if (dbError) {
        console.error("Database insert error:", dbError)
        throw new Error(`Failed to save announcement: ${dbError.message}`)
      }
    } catch (error) {
      console.error("Error saving to database:", error)
      throw error
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setMessage({ type: "error", text: validationError })
      return
    }

    setIsGenerating(true)
    setMessage({ type: null, text: "" })

    try {
      // Prepare form data for API request
      const apiFormData = new FormData()
      apiFormData.append("title", formData.title.trim())
      apiFormData.append("description", formData.description.trim())
      apiFormData.append("venue", formData.venue.trim())
      apiFormData.append("date", formData.date)

      if (formData.image) {
        apiFormData.append("image", formData.image)
      }

      // Make API request to generate brochure
      const response = await fetch("/api/generate-brochure", {
        method: "POST",
        body: apiFormData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API request failed with status: ${response.status}`)
      }

      const result: AIBrochureResponse = await response.json()

      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || "Failed to generate brochure from AI service")
      }

      // Download the generated image
      const imageResponse = await fetch(result.imageUrl)
      if (!imageResponse.ok) {
        throw new Error("Failed to download generated brochure image")
      }

      const imageBlob = await imageResponse.blob()

      // Upload to Supabase storage
      const brochureUrl = await uploadImageToSupabase(imageBlob, `ai-brochure-${formData.title}`)

      if (!brochureUrl) {
        throw new Error("Failed to upload brochure to storage")
      }

      // Save announcement to database
      await saveAnnouncementToDatabase(brochureUrl)

      // Success! Reset form and show success message
      setFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        image: null,
      })

      // Reset file input
      const fileInput = document.getElementById("image") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }

      setMessage({
        type: "success",
        text: "🎉 Amazing! Your AI-powered brochure has been created and announcement published successfully! Redirecting to view all announcements...",
      })

      // Redirect to announcements page after success
     
        router.push("/announcements")
    
    } catch (error) {
      console.error("Error generating AI brochure:", error)
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? `Failed to generate brochure: ${error.message}`
            : "Oops! Something went wrong while creating your AI brochure. Please try again! 🤖",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const getCharacterCountColor = (current: number, max: number): string => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-orange-600"
    return "text-gray-500"
  }

  const getProgressBarColor = (current: number, max: number): string => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-orange-500"
    return "bg-blue-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
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
                Provide your event details and we will generate AI-powered brochure templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base txt-base font-semibold">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Future Tech Conference 2025"
                    className="h-12 text-base"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={isGenerating}
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      💡 A good title is between 10-100 characters and grabs attention!
                    </div>
                    <div
                      className={`text-xs font-medium ${getCharacterCountColor(formData.title.length, TITLE_LIMIT)}`}
                    >
                      {formData.title.length}/{TITLE_LIMIT}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getProgressBarColor(formData.title.length, TITLE_LIMIT)}`}
                      style={{ width: `${Math.min((formData.title.length / TITLE_LIMIT) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base txt-base font-semibold">
                    Event Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event, its purpose, what attendees will learn or experience..."
                    className="min-h-[120px] text-base resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={isGenerating}
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      📝 Include key details like what, when, why, and who should attend!
                    </div>
                    <div
                      className={`text-xs font-medium ${getCharacterCountColor(formData.description.length, DESCRIPTION_LIMIT)}`}
                    >
                      {formData.description.length}/{DESCRIPTION_LIMIT}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getProgressBarColor(formData.description.length, DESCRIPTION_LIMIT)}`}
                      style={{ width: `${Math.min((formData.description.length / DESCRIPTION_LIMIT) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Venue and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-base txt-base font-semibold">
                      Venue *
                    </Label>
                    <Input
                      id="venue"
                      placeholder="e.g., City Convention Center"
                      className="h-12 text-base"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">📍 Include full address or clear location details</div>
                      <div
                        className={`text-xs font-medium ${getCharacterCountColor(formData.venue.length, VENUE_LIMIT)}`}
                      >
                        {formData.venue.length}/{VENUE_LIMIT}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-base txt-base font-semibold">
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      className="h-12 text-base"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      disabled={isGenerating}
                    />
                    <div className="text-xs text-gray-500">📅 When will this amazing event take place?</div>
                  </div>
                </div>

                {/* Event Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-base txt-base font-semibold">
                    Event Image (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="h-12 text-base file:mr-4 file:mt-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-red-600 file:to-orange-600 file:text-white hover:file:from-red-700 hover:file:to-orange-700"
                      disabled={isGenerating}
                    />
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload an image to enhance your brochure design (JPG, PNG)
                    </div>
                  </div>
                  {formData.image && (
                    <div className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded border border-green-200">
                      ✓ Selected: {formData.image.name} ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>

                {/* Message Display */}
                {message.type && (
                  <Alert
                    className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                  >
                    {message.type === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Your AI Brochure...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Create Your Brochure with AI
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
