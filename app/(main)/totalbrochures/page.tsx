"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Download,
  Eye,
  Trash2,
  Plus,
  FileImage,
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Palette,
  Layout,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Brochure {
  id: string
  title: string
  description: string
  venue: string
  date: string
  layout?: string
  color_scheme?: string
  image_url?: string
  brochure_prompt?: string
  created_at: string
  type: "regular" | "ai"
}

interface BrochureStats {
  total: number
  regular: number
  ai: number
  thisMonth: number
  layouts: { [key: string]: number }
  colorSchemes: { [key: string]: number }
}

export default function AdminBrochuresPage() {
  const [brochures, setBrochures] = useState<Brochure[]>([])
  const [filteredBrochures, setFilteredBrochures] = useState<Brochure[]>([])
  const [stats, setStats] = useState<BrochureStats>({
    total: 0,
    regular: 0,
    ai: 0,
    thisMonth: 0,
    layouts: {},
    colorSchemes: {},
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "regular" | "ai">("all")
  const [layoutFilter, setLayoutFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "created_at" | "title">("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [message, setMessage] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  useEffect(() => {
    fetchBrochures()
  }, [])

  useEffect(() => {
    filterAndSortBrochures()
  }, [brochures, searchTerm, typeFilter, layoutFilter, sortBy, sortOrder])

  const fetchBrochures = async () => {
    try {
      setIsLoading(true)

      // Fetch regular brochures
      const { data: regularBrochures, error: regularError } = await supabase
        .from("brochures")
        .select("*")
        .order("created_at", { ascending: false })

      if (regularError) throw regularError

      // Fetch AI brochures
      const { data: aiBrochures, error: aiError } = await supabase
        .from("ai_brochures")
        .select("*")
        .order("created_at", { ascending: false })

      if (aiError) throw aiError

      // Combine and format brochures
      const allBrochures: Brochure[] = [
        ...(regularBrochures || []).map((b) => ({ ...b, type: "regular" as const })),
        ...(aiBrochures || []).map((b) => ({ ...b, type: "ai" as const })),
      ]

      setBrochures(allBrochures)
      calculateStats(allBrochures)
    } catch (error) {
      console.error("Error fetching brochures:", error)
      setMessage({
        type: "error",
        text: "Failed to load brochures. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (brochures: Brochure[]) => {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const stats: BrochureStats = {
      total: brochures.length,
      regular: brochures.filter((b) => b.type === "regular").length,
      ai: brochures.filter((b) => b.type === "ai").length,
      thisMonth: brochures.filter((b) => new Date(b.created_at) >= thisMonth).length,
      layouts: {},
      colorSchemes: {},
    }

    // Calculate layout and color scheme distributions
    brochures.forEach((brochure) => {
      if (brochure.layout) {
        stats.layouts[brochure.layout] = (stats.layouts[brochure.layout] || 0) + 1
      }
      if (brochure.color_scheme) {
        stats.colorSchemes[brochure.color_scheme] = (stats.colorSchemes[brochure.color_scheme] || 0) + 1
      }
    })

    setStats(stats)
  }

  const filterAndSortBrochures = () => {
    let filtered = [...brochures]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (brochure) =>
          brochure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brochure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brochure.venue.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((brochure) => brochure.type === typeFilter)
    }

    // Apply layout filter
    if (layoutFilter !== "all") {
      filtered = filtered.filter((brochure) => brochure.layout === layoutFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | Date
      let bValue: string | Date

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date)
          bValue = new Date(b.date)
          break
        case "created_at":
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
          break
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        default:
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFilteredBrochures(filtered)
  }

  const handleDelete = async (id: string, type: "regular" | "ai") => {
    if (!confirm("Are you sure you want to delete this brochure? This action cannot be undone.")) {
      return
    }

    try {
      const tableName = type === "regular" ? "brochures" : "ai_brochures"
      const { error } = await supabase.from(tableName).delete().eq("id", id)

      if (error) throw error

      setMessage({
        type: "success",
        text: "Brochure deleted successfully!",
      })

      // Refresh the list
      fetchBrochures()
    } catch (error) {
      console.error("Error deleting brochure:", error)
      setMessage({
        type: "error",
        text: "Failed to delete brochure. Please try again.",
      })
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Title", "Description", "Venue", "Event Date", "Type", "Layout", "Color Scheme", "Created At"],
      ...filteredBrochures.map((brochure) => [
        brochure.title,
        brochure.description,
        brochure.venue,
        brochure.date,
        brochure.type,
        brochure.layout || "",
        brochure.color_scheme || "",
        new Date(brochure.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `brochures-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTypeColor = (type: "regular" | "ai") => {
    return type === "ai" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
  }

  const getLayoutIcon = (layout?: string) => {
    switch (layout) {
      case "trifold":
        return <Layout className="w-4 h-4" />
      case "bifold":
        return <FileImage className="w-4 h-4" />
      default:
        return <FileImage className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading brochures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Total Brochures Management</h1>
          <p className="text-lg text-gray-600">Manage all your brochures in one place</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Brochures</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Regular Brochures</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.regular}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Generated</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.ai}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-green-600">{stats.thisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Brochure Management</span>
              <div className="flex gap-2">
                <Button onClick={exportToCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Link href="/create-brochure">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="text-sm font-medium">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by title, description, or venue..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <Label className="text-sm font-medium">Type</Label>
                <Select value={typeFilter} onValueChange={(value: "all" | "regular" | "ai") => setTypeFilter(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="ai">AI Generated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Layout Filter */}
              <div>
                <Label className="text-sm font-medium">Layout</Label>
                <Select value={layoutFilter} onValueChange={setLayoutFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Layouts</SelectItem>
                    <SelectItem value="trifold">Trifold</SelectItem>
                    <SelectItem value="bifold">Bifold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div>
                <Label className="text-sm font-medium">Sort By</Label>
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [field, order] = value.split("-")
                    setSortBy(field as "date" | "created_at" | "title")
                    setSortOrder(order as "asc" | "desc")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at-desc">Newest First</SelectItem>
                    <SelectItem value="created_at-asc">Oldest First</SelectItem>
                    <SelectItem value="date-desc">Event Date (Latest)</SelectItem>
                    <SelectItem value="date-asc">Event Date (Earliest)</SelectItem>
                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                    <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>
                Showing {filteredBrochures.length} of {stats.total} brochures
              </span>
              {(searchTerm || typeFilter !== "all" || layoutFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setTypeFilter("all")
                    setLayoutFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Display */}
        {message.type && (
          <Alert
            className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
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

        {/* Brochures Table */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-900">Title</TableHead>
                    <TableHead className="font-semibold text-gray-900">Venue</TableHead>
                    <TableHead className="font-semibold text-gray-900">Event Date</TableHead>
                    <TableHead className="font-semibold text-gray-900">Type</TableHead>
                    <TableHead className="font-semibold text-gray-900">Layout</TableHead>
                    <TableHead className="font-semibold text-gray-900">Created</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrochures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="text-gray-500">
                          <FileImage className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">No brochures found</p>
                          <p className="text-sm">
                            {searchTerm || typeFilter !== "all" || layoutFilter !== "all"
                              ? "Try adjusting your filters"
                              : "Create your first brochure to get started"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBrochures.map((brochure) => (
                      <TableRow key={`${brochure.type}-${brochure.id}`} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 truncate max-w-[200px]">{brochure.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">{brochure.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate max-w-[150px]">{brochure.venue}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                            {formatDate(brochure.date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(brochure.type)}>
                            {brochure.type === "ai" ? "AI Generated" : "Regular"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {brochure.layout && (
                            <div className="flex items-center text-gray-600">
                              {getLayoutIcon(brochure.layout)}
                              <span className="ml-1 capitalize">{brochure.layout}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-600">{formatDate(brochure.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {brochure.image_url && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(brochure.image_url, "_blank")}
                                title="View Brochure"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(brochure.id, brochure.type)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete Brochure"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
