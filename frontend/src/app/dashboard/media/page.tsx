"use client"

import { useAppStore } from "@/store/use-app-store"
import { Search, Filter, Play, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const mockReels = Array.from({ length: 8 }).map((_, i) => ({
  id: `mock-${i + 1}`,
  thumbnail: `https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop&q=80`,
  views: Math.floor(Math.random() * 50000) + 1000,
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: Math.floor(Math.random() * 500) + 10,
}))

export default function MediaPage() {
  const { isInstagramConnected } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage automations for your latest reels and posts.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search media..." 
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <button className="p-2 border border-border bg-card rounded-lg hover:bg-accent transition-colors flex shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isInstagramConnected && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-primary">Connect Instagram to manage real media</h3>
            <p className="text-sm text-muted-foreground">Currently displaying demo content to preview system capabilities.</p>
          </div>
          <Link href="/dashboard/settings" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
            Connect
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockReels.map((reel) => (
          <Link key={reel.id} href={`/dashboard/media/${reel.id}`} className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer block block">
            <img 
              src={reel.thumbnail} 
              alt="Reel thumbnail" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{(reel.views / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1"><Heart className="w-3 h-3 fill-white" /> {reel.likes}</div>
                <div className="flex items-center gap-1"><MessageCircle className="w-3 h-3 fill-white" /> {reel.comments}</div>
              </div>
            </div>
            
            {/* Hover Automation indicator overlay */}
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-background text-foreground font-medium text-sm px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Manage Automations
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
