import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: string
          title: string
          description: string
          event_venue: string
          brochure_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_venue: string
          brochure_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_venue?: string
          brochure_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
