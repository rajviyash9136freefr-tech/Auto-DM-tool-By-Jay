"use client"

import { useAppStore } from "@/store/use-app-store"
import { CheckCircle2, Instagram, Unplug } from "lucide-react"

export function InstagramConnect() {
  const { isInstagramConnected, connectInstagram, disconnectInstagram } = useAppStore()

  if (isInstagramConnected) {
    return (
      <div className="w-full bg-card border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between transition-all">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden border-2 border-background">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" 
                  alt="Profile" 
                  className="w-12 h-12 object-cover" 
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">@johndoe_automata</h3>
            <p className="text-sm text-emerald-500 font-medium">Successfully Connected</p>
          </div>
        </div>
        <button 
          onClick={disconnectInstagram}
          className="px-4 py-2 text-sm font-medium border border-destructive/50 text-destructive rounded-lg hover:bg-destructive/10 transition-colors flex items-center gap-2"
        >
          <Unplug className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="w-full bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
        <Instagram className="w-8 h-8 text-white" />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-card-foreground">Connect Instagram</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">
          Link your professional account to unlock automated DMs, replies, and leads.
        </p>
      </div>

      <button 
        onClick={connectInstagram}
        className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Connect via Meta
      </button>
    </div>
  )
}
