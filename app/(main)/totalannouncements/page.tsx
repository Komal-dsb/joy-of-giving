"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Loader2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import type { AnnouncementRecord } from "@/components/types/announcement";
import { toast } from "sonner";

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<
    AnnouncementRecord[]
  >([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"date" | "created" | "title">("date");

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnnouncements();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterAndSortAnnouncements();
  }, [announcements, searchTerm, statusFilter, sortBy]);

  const checkAuth = () => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace("/login");
    }
    setIsLoading(false);
  };

  const fetchAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true);
      setError(null);

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setAnnouncements(data || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements. Please try again.");
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const filterAndSortAnnouncements = () => {
    let filtered = [...announcements];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ann) =>
          ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ann.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ann.eventVenue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = filtered.filter((ann) => {
        const eventDate = new Date(ann.eventDate);
        const isUpcoming = eventDate >= today;

        return statusFilter === "upcoming" ? isUpcoming : !isUpcoming;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
          );
        case "created":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredAnnouncements(filtered);
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);

      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
      toast.success(`"${title}" deleted successfully!`);
      // Remove from local state
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting announcement:", err);
      setError("Failed to delete announcement. Please try again.");
      toast.error("Failed to delete announcement. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcomingEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const exportToCSV = () => {
    const csvContent = [
      [
        "Title",
        "Description",
        "Venue",
        "Event Date",
        "Created At",
        "Status",
        "Has Brochure",
      ].join(","),
      ...filteredAnnouncements.map((ann) =>
        [
          `"${ann.title}"`,
          `"${ann.description.replace(/"/g, '""')}"`,
          `"${ann.eventVenue}"`,
          ann.eventDate,
          ann.created_at,
          isUpcomingEvent(ann.eventDate) ? "Upcoming" : "Past",
          ann.brochure_url ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `announcements-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 txt-base animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const stats = {
    total: announcements.length,
    upcoming: announcements.filter((ann) => isUpcomingEvent(ann.eventDate))
      .length,
    past: announcements.filter((ann) => !isUpcomingEvent(ann.eventDate)).length,
    withBrochures: announcements.filter((ann) => ann.brochure_url).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                All <span className="txt-base">Announcements</span>
              </h1>
              <p className="text-gray-600">
                Manage all your announcements in one place
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/createannouncement")}
                className="bg-base hover:bg-base flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Announcement
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            variants={fadeInUp}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <FileText className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  All announcements
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcoming}</div>
                <p className="text-xs text-muted-foreground">Future events</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Past Events
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.past}</div>
                <p className="text-xs text-muted-foreground">
                  Completed events
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  With Files
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.withBrochures}</div>
                <p className="text-xs text-muted-foreground">Have brochures</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | "upcoming" | "past") =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="upcoming">Upcoming Only</SelectItem>
                      <SelectItem value="past">Past Events</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={sortBy}
                    onValueChange={(value: "date" | "created" | "title") =>
                      setSortBy(value)
                    }
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Event Date</SelectItem>
                      <SelectItem value="created">
                        Sort by Created Date
                      </SelectItem>
                      <SelectItem value="title">Sort by Title</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
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
                  <FileText className="w-5 h-5 text-red-600" />
                  <span>Announcements ({filteredAnnouncements.length})</span>
                </CardTitle>
                <CardDescription>
                  {searchTerm || statusFilter !== "all"
                    ? `Showing filtered results from ${announcements.length} total announcements`
                    : "Complete list of all announcements"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAnnouncements ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 txt-base animate-spin mr-2" />
                    <span className="text-gray-600">
                      Loading announcements...
                    </span>
                  </div>
                ) : filteredAnnouncements.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {searchTerm || statusFilter !== "all"
                        ? "No matching announcements"
                        : "No announcements yet"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "Create your first announcement to get started!"}
                    </p>
                    {!searchTerm && statusFilter === "all" && (
                      <Button
                        onClick={() => router.push("/")}
                        className="bg-base hover:bg-base"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Announcement
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold txt-base">Title</TableHead>
                          <TableHead className="font-semibold txt-base">
                            Description
                          </TableHead>
                          <TableHead className="font-semibold txt-base">Venue</TableHead>
                          <TableHead className="font-semibold txt-base">
                            Event Date
                          </TableHead>
                          <TableHead className="font-semibold txt-base">
                            Created
                          </TableHead>
                          <TableHead className="font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="font-semibold txt-base">Files</TableHead>
                          <TableHead className="font-semibold text-center txt-base">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAnnouncements.map((announcement) => (
                          <TableRow
                            key={announcement.id}
                            className="hover:bg-red-50/50"
                          >
                            <TableCell className="font-medium max-w-[200px]">
                              <div
                                className="truncate"
                                title={announcement.title}
                              >
                                {announcement.title}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[250px]">
                              <div
                                className="truncate text-gray-600"
                                title={announcement.description}
                              >
                                {announcement.description}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[150px]">
                              <div className="flex items-center txt-base">
                                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span
                                  className="truncate"
                                  title={announcement.eventVenue}
                                >
                                  {announcement.eventVenue}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {formatDate(announcement.eventDate)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-500">
                                {formatDateTime(announcement.created_at)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  isUpcomingEvent(announcement.eventDate)
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                }
                              >
                                {isUpcomingEvent(announcement.eventDate)
                                  ? "Upcoming"
                                  : "Past"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {announcement.brochure_url ? (
                                <a
                                  href={announcement.brochure_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View
                                </a>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  No file
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Link
                                  href={`/announcements/${announcement.id}`}
                                  title="View Details"
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 hover:bg-base bg-base text-foreground hover:text-foreground"
                                  >
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </Link>

                                <Link
                                  href={`/editannouncement/${announcement.id}`}
                                  title="Edit"
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 hover:bg-base bg-base text-foreground hover:text-foreground"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </Link>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleDelete(
                                      announcement.id,
                                      announcement.title
                                    )
                                  }
                                  disabled={deletingId === announcement.id}
                                  className="h-8 w-8 p-0 bg-base hover:bg-base text-foreground hover:text-foreground"
                                  title="Delete"
                                >
                                  {deletingId === announcement.id ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3 h-3" />
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
  );
}
