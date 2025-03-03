import { createClient } from "@supabase/supabase-js"
import type { Photo } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getPhotos(): Promise<Photo[]> {
  try {
    const { data, error } = await supabase.from("photos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching photos:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching photos:", error)
    return []
  }
}

export async function getPhotoById(id: string): Promise<Photo | null> {
  try {
    const { data, error } = await supabase.from("photos").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching photo:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error fetching photo:", error)
    return null
  }
}

