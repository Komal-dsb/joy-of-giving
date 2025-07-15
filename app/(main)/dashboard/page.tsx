"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Shield,
  FileText,
  Calendar,
  
  Loader2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import type { AnnouncementRecord } from "@/components/types/announcement"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([])
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  useEffect(() => {
    checkAuth()
  },[])

  

  const checkAuth = () => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.replace("/login")
    }
    setIsLoading(false)
  }

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoadingAnnouncements(true)
      setError(null)

      const { data, error } = await supabase.from("announcements").select("*").order("eventDate", { ascending: true })

      if (error) {
        throw error
      }

      setAnnouncements(data || [])
    } catch (err) {
      console.error("Error fetching announcements:", err)
      setError("Failed to load announcements. Please try again.")
    } finally {
      setLoadingAnnouncements(false)
    }
  },[])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnnouncements()
    }
  }, [isAuthenticated, fetchAnnouncements])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) {
      return
    }

    try {
      setDeletingId(id)

      const { error } = await supabase.from("announcements").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Remove from local state
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id))
    } catch (err) {
      console.error("Error deleting announcement:", err)
      setError("Failed to delete announcement. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isUpcomingEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return eventDate >= today
  }

  const getStats = () => {
    const total = announcements.length
    const upcoming = announcements.filter((ann) => isUpcomingEvent(ann.eventDate)).length
    const withBrochures = announcements.filter((ann) => ann.brochure_url).length

    return { total, upcoming, withBrochures }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-background animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            variants={fadeInUp}
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin <span className="text-background">Dashboard</span>
              </h1>
              <p className="text-gray-600">Manage your announcements and events efficiently ✨</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push("/createannouncement")} className="bg-background hover:bg-background flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Announcement
              </Button>
              <Button
                onClick={() => router.push("/createbrochure")}
                variant="outline"
                className="bg-background text-white hover:text-white hover:bg-background flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Create Brochure
              </Button>
           
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={fadeInUp}>
            <Card onClick={() => router.push("/totalannouncements")} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
                <FileText className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All time announcements</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcoming}</div>
                <p className="text-xs text-muted-foreground">Events scheduled ahead</p>
              </CardContent>
            </Card>

            <Card onClick={() => router.push("/totalbrochures")} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">With Brochures</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withBrochures}</div>
                <p className="text-xs text-muted-foreground">Announcements with files</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div className="mb-6" variants={fadeInUp}>
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                  <Button
                    onClick={fetchAnnouncements}
                    variant="link"
                    className="p-0 h-auto ml-2 text-red-600 hover:text-red-700"
                  >
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Announcements Table */}
          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <span>All Announcements</span>
                </CardTitle>
                <CardDescription>Manage and organize all your announcements in one place</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAnnouncements ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-red-600 animate-spin mr-2" />
                    <span className="text-gray-600">Loading announcements...</span>
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
                    <p className="text-gray-600 mb-6">Create your first announcement to get started!</p>
                    <Button onClick={() => router.push("/createannouncement")} className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Announcement
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Title</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                          <TableHead className="font-semibold">Venue</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                        
                          <TableHead className="font-semibold">Brochure</TableHead>
                          <TableHead className="font-semibold text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {announcements.map((announcement) => (
                          <TableRow key={announcement.id} className="hover:bg-red-50/50">
                            <TableCell className="font-medium max-w-[200px]">
                              <div className="truncate" title={announcement.title}>
                                {announcement.title}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[250px]">
                              <div className="truncate text-gray-600" title={announcement.description}>
                                {announcement.description}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[150px]">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span className="truncate" title={announcement.eventVenue}>
                                  {announcement.eventVenue}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{formatDate(announcement.eventDate)}</div>
                            </TableCell>
                         
                            <TableCell>
                              {announcement.brochure_url ? (
                                <a
                                  href={announcement.brochure_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View
                                </a>
                              ) : (
                                <span className="text-gray-400 text-sm">No file</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => router.push(`/editannouncement/${announcement.id}`)}
                                  className="h-8 w-8 p-0 bg-background text-white hover:bg-background hover:text-white"
                                >
                                  <Edit className="w-3 h-3 text-white hover:text-background" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(announcement.id)}
                                  disabled={deletingId === announcement.id}
                                  className="h-8 w-8 p-0 bg-background text-white hover:bg-background hover:text-white"
                                >
                                  {deletingId === announcement.id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3 h-3 text-white hover:text-white hover:bg-background" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
