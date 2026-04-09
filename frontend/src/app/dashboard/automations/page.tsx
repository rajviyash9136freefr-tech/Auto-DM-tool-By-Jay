"use client"

import Link from "next/link"
import { PlaySquare } from "lucide-react"

import { useAppStore } from "@/store/use-app-store"
import { InstagramLock } from "@/components/instagram-lock"

export default function AutomationsPage() {
  const { isInstagramConnected } = useAppStore()

  if (!isInstagramConnected) {
    return <InstagramLock title="Automations Locked" description="Connect your Instagram account to configure automated replies." />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <PlaySquare className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Manage Your Automations</h2>
      <p className="text-muted-foreground w-full max-w-sm">Select a specific media post to set up comment replies and direct messages.</p>
      
      <Link href="/dashboard/media" className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
        Go to Media
      </Link>
    </div>
  )
}
