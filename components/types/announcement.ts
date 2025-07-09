export interface AnnouncementFormData {
  title: string
  description: string
  eventVenue: string
   eventDate:string
  brochure: File | null
}

export interface AnnouncementRecord {
  id: string
  title: string
  description: string
  event_venue: string
  event_date:string
  brochure_url: string | null
  created_at: string
}
