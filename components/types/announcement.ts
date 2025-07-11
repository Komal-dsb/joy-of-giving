export interface AnnouncementFormData {
  tags: never[]
  author: string
  keywords: string
  created_at: string
  updated_at: string
  image_url: string
  title: string
  description: string
  event_venue: string
  event_date:string
  brochure_url: string | null
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
