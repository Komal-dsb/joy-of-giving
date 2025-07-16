"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Upload, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { AnnouncementFormData } from "@/components/types/announcement"
import { useRouter } from "next/navigation"


const initialFormData: AnnouncementFormData = {
  title: "",
  description: "",
  eventVenue: "",
  eventDate: "",
  brochure: null,
  tags: [],
  author: "",
  keywords: "",
  created_at: "",
  updated_at: "",
  image_url: "",
  brochure_url: null
};
// Character limits for better UX
const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 1000

export default function AnnouncementForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<AnnouncementFormData>(initialFormData)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  // Helper function to get character count styling
  const getCharCountStyle = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-red-600 font-semibold"
    if (percentage >= 75) return "text-orange-500 font-medium"
    return "text-gray-500"
  }

  // Helper function to get progress bar styling
  const getProgressBarStyle = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-orange-500"
    return "bg-blue-500"
  }

  const handleInputChange = (field: keyof Omit<AnnouncementFormData, "brochure">, value: string) => {
    // Apply character limits
    let limitedValue = value
    if (field === "title" && value.length > TITLE_MAX_LENGTH) {
      limitedValue = value.substring(0, TITLE_MAX_LENGTH)
    } else if (field === "description" && value.length > DESCRIPTION_MAX_LENGTH) {
      limitedValue = value.substring(0, DESCRIPTION_MAX_LENGTH)
    }

    setFormData((prev) => ({ ...prev, [field]: limitedValue }))

    // Clear any previous messages when user starts typing
    if (message.type) {
      setMessage({ type: null, text: "" })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, brochure: file }))

    // Clear any previous messages when user selects a file
    if (message.type) {
      setMessage({ type: null, text: "" })
    }
  }

  const uploadBrochure = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `brochure/${fileName}`

      // 1. Try uploading the file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("brochures")
        .upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return null
      }

      console.log("Upload data:", uploadData)

      // 2. Get the public URL
      const { data } = supabase.storage.from("brochures").getPublicUrl(filePath)

      console.log("Public URL data:", data)

      if (!data || !data.publicUrl) {
        console.error("No public URL returned for file:", filePath)
        return null
      }

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    }
  }

  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Please add a wonderful title for your announcement! ✨"
    }
    if (formData.title.trim().length < 10) {
      return "Your title should be at least 10 characters long for better engagement! 📝"
    }
    if (!formData.description.trim()) {
      return "We'd love to hear more details in the description! 📝"
    }
    if (formData.description.trim().length < 20) {
      return "Please provide a more detailed description (at least 20 characters) to help people understand your event! 💡"
    }
    if (!formData.eventVenue.trim()) {
      return "Don't forget to let everyone know where the magic happens! 📍"
    }
    if (!formData.eventDate.trim()) {
      return "When is this exciting event happening? Please select a date! 📅"
    }

    // Check if date is in the past
    const selectedDate = new Date(formData.eventDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return "Please select a future date for your event! Time travel isn't available yet! ⏰"
    }

    return null
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setMessage({ type: "error", text: validationError })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: null, text: "" })

    try {
      let brochureUrl: string | null = null

      // Upload brochure if provided
      if (formData.brochure) {
        brochureUrl = await uploadBrochure(formData.brochure)
      }

      // Save to database
      const { error: dbError } = await supabase.from("announcements").insert([
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          eventVenue: formData.eventVenue.trim(),
          eventDate: formData.eventDate,
          brochure_url: brochureUrl,
        },
      ])

      if (dbError) {
        throw dbError
      }

      // Success! Reset form and show success message
    setFormData(prev => ({
  ...prev,
  title: "",
  description: "",
  eventVenue: "",
  eventDate: "",
  brochure: null,
}));


      // Reset file input
      const fileInput = document.getElementById("brochure") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }

      setMessage({
        type: "success",
        text: "🎉 Fantastic! Your announcement has been created successfully and is ready to inspire everyone!",
      })

      // Redirect to announcements page after a short delay
      
        router.push("/announcements")
    
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Oops! Something went wrong while creating your announcement. Please give it another try!",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-2xl mx-auto py-10 p-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Create new{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Announcement
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Share something amazing with your community! Fill out the details below to create an engaging announcement.
            ✨
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="title" className="txt-base font-medium">
                    Announcement Title *
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${getCharCountStyle(formData.title.length, TITLE_MAX_LENGTH)}`}>
                      {formData.title.length}/{TITLE_MAX_LENGTH}
                    </span>
                  </div>
                </div>
                <Input
                  id="title"
                  type="text"
                  placeholder="Give your announcement a catchy title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full text-gray-900"
                  disabled={isSubmitting}
                />
                {/* Progress bar for title */}
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${getProgressBarStyle(formData.title.length, TITLE_MAX_LENGTH)}`}
                    style={{ width: `${Math.min((formData.title.length / TITLE_MAX_LENGTH) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  💡 Tip: A good title is between 10-{TITLE_MAX_LENGTH} characters and grabs attention!
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description" className="txt-base font-medium">
                    Description *
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs ${getCharCountStyle(formData.description.length, DESCRIPTION_MAX_LENGTH)}`}
                    >
                      {formData.description.length}/{DESCRIPTION_MAX_LENGTH}
                    </span>
                  </div>
                </div>
                <Textarea
                  id="description"
                  placeholder="Tell everyone what makes this announcement special! Share all the exciting details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full min-h-[120px] resize-none text-gray-900"
                  disabled={isSubmitting}
                />
                {/* Progress bar for description */}
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${getProgressBarStyle(formData.description.length, DESCRIPTION_MAX_LENGTH)}`}
                    style={{ width: `${Math.min((formData.description.length / DESCRIPTION_MAX_LENGTH) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  📝 Tip: Include key details like what, when, why, and who should attend!
                </div>
              </div>

              {/* Event/Venue Field */}
              <div className="space-y-2">
                <Label htmlFor="eventVenue" className="txt-base font-medium">
                  Event/Venue *
                </Label>
                <Input
                  id="eventVenue"
                  type="text"
                  placeholder="Where will this amazing event take place?"
                  value={formData.eventVenue}
                  onChange={(e) => handleInputChange("eventVenue", e.target.value)}
                  className="w-full text-gray-900"
                  disabled={isSubmitting}
                />
                <div className="text-xs text-gray-500">
                  📍 Include full address or clear location details for easy navigation
                </div>
              </div>

              {/* Event Date Field */}
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="txt-base font-medium">
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  className="w-full text-gray-900"
                  disabled={isSubmitting}
                  min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                />
                <div className="text-xs text-gray-500">📅 When will this amazing event take place?</div>
              </div>

              {/* Brochure Upload Field */}
              <div className="space-y-2">
                <Label htmlFor="brochure" className="text-gray-900 font-medium">
                  Brochure (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="brochure"
                    type="file"
                    accept=".jpg,.png"
                    onChange={handleFileChange}
                    className="w-full file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-500 file:text-primary-foreground  hover:file:bg-red-600"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Upload className="w-3 h-3 mr-1" />
                    Accepted formats:  JPG, PNG 
                  </div>
                </div>
                {formData.brochure && (
                  <div className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded border border-green-200">
                    ✓ Selected: {formData.brochure.name}
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
                className="w-full bg-gradient-to-r  from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 py-3 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Your Announcement...
                  </>
                ) : (
                  "Create Announcement 🚀"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
