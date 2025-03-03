"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadPhoto(
  fileData: string,
  fileName: string,
  fileType: string,
  title?: string,
  description?: string,
) {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(fileData.split(",")[1], "base64")

    const fileExt = fileName.split(".").pop()
    const uniqueFileName = `${uuidv4()}.${fileExt}`
    const filePath = `photos/${uniqueFileName}`

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, buffer, {
      contentType: fileType,
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("photos").getPublicUrl(filePath)

    // Insert record into database
    const { data: insertedData, error: dbError } = await supabase
      .from("photos")
      .insert({
        title: title || null,
        description: description || null,
        url: publicUrl,
      })
      .select()

    if (dbError) {
      throw new Error(`Database insert failed: ${dbError.message}`)
    }

    revalidatePath("/")

    return { success: true, data: insertedData[0] }
  } catch (error) {
    console.error("Error in uploadPhoto:", error)
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" }
  }
}

