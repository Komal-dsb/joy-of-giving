"use client"

import type React from "react"

import { useState } from "react"
import { Button} from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Upload, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { AnnouncementFormData } from "@/components/types/announcement"


export default function AnnouncementForm() {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    description: "",
    eventVenue: "",
    eventDate: "",
    brochure: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  const handleInputChange = (field: keyof Omit<AnnouncementFormData, "brochure">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `brochure/${fileName}`;

    // 1. Try uploading the file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("brochure-url")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }
    console.log("Upload data:", uploadData);

    // 2. Get the public URL
    const { data } = supabase.storage.from("brochure-url").getPublicUrl(filePath);
    console.log("Public URL data:", data);

    if (!data || !data.publicUrl) {
      console.error("No public URL returned for file:", filePath);
      return null;
    }

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};




  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Please add a wonderful title for your announcement! ✨"
    }
    if (!formData.description.trim()) {
      return "We'd love to hear more details in the description! 📝"
    }
    if (!formData.eventVenue.trim()) {
      return "Don't forget to let everyone know where the magic happens! 📍"
    }
    if (!formData.eventDate.trim()) {
      return "When is this exciting event happening? Please select a date! 📅"
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
      const { error: dbError } = await supabase.from('announcements').insert([
        {
        title: formData.title.trim(),
        description: formData.description.trim(),
        event_venue: formData.eventVenue.trim(),
        event_date: formData.eventDate,
        brochure_url: brochureUrl,
      }])

      if (dbError) {
        throw dbError
      }

      // Success! Reset form and show success message
      setFormData({
        title: "",
        description: "",
        eventVenue: "",
        eventDate: "",
        brochure: null,
      })

      // Reset file input
      const fileInput = document.getElementById("brochure") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }

      setMessage({
        type: "success",
        text: "🎉 Fantastic! Your announcement has been created successfully and is ready to inspire everyone!",
      })
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
    <div className="w-full max-w-2xl mx-auto py-10 p-4">
      <Card className="shadow-lg ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">Create New Announcement</CardTitle>
          <CardDescription className="text-gray-900">
            Share something amazing with your community! Fill out the details below to create an engaging announcement.
            ✨
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-red-600 font-medium">
                Announcement Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Give your announcement a catchy title..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full text-gray-900"
                disabled={isSubmitting}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-red-600 font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Tell everyone what makes this announcement special! Share all the exciting details..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full min-h-[120px] resize-none text-gray-900"
                disabled={isSubmitting}
              />
            </div>

            {/* Event/Venue Field */}
            <div className="space-y-2">
              <Label htmlFor="eventVenue" className="text-red-600 font-medium">
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
            </div>

            {/* Event Date Field */}
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-red-600 font-medium">
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
              <div className="text-xs text-muted-foreground">📅 When will this amazing event take place?</div>
            </div>

            {/* Brochure Upload Field */}
            <div className="space-y-2">
              <Label htmlFor="brochure" className="text-red-600 font-medium">
                Brochure (Optional)
              </Label>
              <div className="relative">
                <Input
                  id="brochure"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className=" w-full  file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-primary-foreground hover:file:bg-red-700"
                  disabled={isSubmitting}
                />
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Upload className="w-3 h-3  mr-1" />
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </div>
              </div>
              {formData.brochure && (
                <div className="text-sm text-green-600 font-medium">✓ Selected: {formData.brochure.name}</div>
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
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-3 text-base font-medium" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Your Announcement...
                </>
              ) : (
                "Done - Create Announcement! 🚀"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
