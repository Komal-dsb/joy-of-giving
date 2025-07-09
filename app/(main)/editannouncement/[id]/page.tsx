"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Upload, Loader2, ArrowLeft, Save, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { AnnouncementFormData } from "@/components/types/announcement"

export default function EditAnnouncementForm() {
  const router = useRouter()
  const params = useParams()
  const announcementId = params.id as string

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    description: "",
    eventVenue: "",
    eventDate: "",
    brochure: null,
  })

  const [currentBrochureUrl, setCurrentBrochureUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  useEffect(() => {
    if (announcementId) {
      fetchAnnouncement()
    }
  }, [announcementId])

  const fetchAnnouncement = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("announcements").select("*").eq("id", announcementId).single()

      if (error) {
        throw error
      }

      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          eventVenue: data.event_venue,
          eventDate: data.event_date,
          brochure: null, // File input will be empty initially
        })
        setCurrentBrochureUrl(data.brochure_url)
      }
    } catch (error) {
      console.error("Error fetching announcement:", error)
      setMessage({
        type: "error",
        text: "Failed to load announcement. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `brochures/${fileName}`

      const { error: uploadError } = await supabase.storage.from("announcements").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("announcements").getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error("Error uploading file:", error)
      throw new Error("Failed to upload brochure. Please try again.")
    }
  }

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
      let brochureUrl: string | null = currentBrochureUrl

      // Upload new brochure if provided
      if (formData.brochure) {
        brochureUrl = await uploadBrochure(formData.brochure)
      }

      // Update in database
      const { error: dbError } = await supabase
        .from("announcements")
        .update({
          title: formData.title.trim(),
          description: formData.description.trim(),
          event_venue: formData.eventVenue.trim(),
          event_date: formData.eventDate,
          brochure_url: brochureUrl,
        })
        .eq("id", announcementId)

      if (dbError) {
        throw dbError
      }

      setMessage({
        type: "success",
        text: "🎉 Fantastic! Your announcement has been updated successfully!",
      })

      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error updating announcement:", error)
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Oops! Something went wrong while updating your announcement. Please give it another try! 💪",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    setMessage({ type: null, text: "" })

    try {
      const { error } = await supabase.from("announcements").delete().eq("id", announcementId)

      if (error) {
        throw error
      }

      setMessage({
        type: "success",
        text: "Announcement deleted successfully! Redirecting...",
      })

     
        router.push("/dashboard")
     
    } catch (error) {
      console.error("Error deleting announcement:", error)
      setMessage({
        type: "error",
        text: "Failed to delete announcement. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading announcement details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="mb-6 hover:bg-white/80 bg-white/60"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Edit <span className="text-red-600">Announcement</span>
            </h1>
            <p className="text-gray-600 text-lg">Update your announcement details and make it even more amazing! ✨</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Announcement Details</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Make your changes below and save when you are ready
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Announcement Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Give your announcement a catchy title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    disabled={isSubmitting || isDeleting}
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell everyone what makes this announcement special! Share all the exciting details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full min-h-[140px] resize-none border-gray-200 focus:border-red-500 focus:ring-red-500"
                    disabled={isSubmitting || isDeleting}
                  />
                </div>

                {/* Event/Venue Field */}
                <div className="space-y-2">
                  <Label htmlFor="eventVenue" className="text-sm font-semibold text-gray-700">
                    Event/Venue *
                  </Label>
                  <Input
                    id="eventVenue"
                    type="text"
                    placeholder="Where will this amazing event take place?"
                    value={formData.eventVenue}
                    onChange={(e) => handleInputChange("eventVenue", e.target.value)}
                    className="w-full h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    disabled={isSubmitting || isDeleting}
                  />
                </div>

                {/* Event Date Field */}
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-sm font-semibold text-gray-700">
                    Event Date *
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    className="w-full h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    disabled={isSubmitting || isDeleting}
                  />
                  <div className="text-xs text-gray-500 flex items-center">
                    📅 When will this amazing event take place?
                  </div>
                </div>

                {/* Current Brochure Display */}
                {currentBrochureUrl && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Current Brochure</Label>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">📎</div>
                          <span className="text-sm font-medium text-blue-800">Current file attached</span>
                        </div>
                        <a
                          href={currentBrochureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline"
                        >
                          View File →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Brochure Upload Field */}
                <div className="space-y-2">
                  <Label htmlFor="brochure" className="text-sm font-semibold text-gray-700">
                    {currentBrochureUrl ? "Replace Brochure (Optional)" : "Brochure (Optional)"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="brochure"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="w-full h-12 border-gray-200  focus:border-red-500 focus:ring-red-500 file:mr-4 file:mt-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700"
                      disabled={isSubmitting || isDeleting}
                    />
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Upload className="w-3 h-3 mr-1" />
                      {currentBrochureUrl
                        ? "Upload a new file to replace the current one"
                        : "Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)"}
                    </div>
                  </div>
                  {formData.brochure && (
                    <div className="text-sm text-green-600 font-semibold bg-green-50 p-2 rounded border border-green-200">
                      ✓ New file selected: {formData.brochure.name}
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 h-12 text-base font-semibold bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting || isDeleting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Updating Announcement...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Update Announcement! 🚀
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isSubmitting || isDeleting}
                    className="sm:w-auto h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
