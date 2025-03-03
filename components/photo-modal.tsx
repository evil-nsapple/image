"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Photo } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface PhotoModalProps {
  photo: Photo | null
  isOpen: boolean
  onClose: () => void
}

export default function PhotoModal({ photo, isOpen, onClose }: PhotoModalProps) {
  if (!photo) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-3 relative aspect-square md:aspect-auto">
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.title || "Photo"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain bg-black/5"
              priority
            />
          </div>

          <div className="md:col-span-2 p-6">
            {photo.title && <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>}

            {photo.description && <p className="text-muted-foreground mb-4">{photo.description}</p>}

            <div className="flex flex-col gap-4 mt-6">
              <div className="text-sm text-muted-foreground">
                Uploaded {formatDistanceToNow(new Date(photo.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

