import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getPhotos } from "@/lib/supabase-server"
import dynamic from "next/dynamic"

const PhotoGrid = dynamic(() => import("@/components/photo-grid"), { ssr: false })

export default async function HomePage() {
  const photos = await getPhotos()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Photo Gallery</h1>
        <Link href="/upload">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Upload Photo
          </Button>
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">No photos yet</h2>
          <p className="text-muted-foreground mb-6">Be the first to share a photo!</p>
          <Link href="/upload">
            <Button>Upload a Photo</Button>
          </Link>
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  )
}

