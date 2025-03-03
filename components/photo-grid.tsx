"use client"

import Image from "next/image"
import { useState } from "react"
import type { Photo } from "@/lib/types"
import PhotoModal from "./photo-modal"

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.title || "Uploaded image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <PhotoModal photo={selectedPhoto} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  )
}

