"use client"

import { ArrowUpRight, MessageSquare, Users, Eye, PlaySquare } from "lucide-react"
import { useAppStore } from "@/store/use-app-store"
import { InstagramLock } from "@/components/instagram-lock"

export default function DashboardPage() {
  const { isInstagramConnected } = useAppStore()

  const stats = [
    { name: "Total Leads", value: isInstagramConnected ? "1,240" : "—", change: isInstagramConnected ? "+12.5%" : "0%", icon: Users },
    { name: "DM Replies Sent", value: isInstagramConnected ? "8,392" : "—", change: isInstagramConnected ? "+4.1%" : "0%", icon: MessageSquare },
    { name: "Profile Views", value: isInstagramConnected ? "32.1K" : "—", change: isInstagramConnected ? "+24.3%" : "0%", icon: Eye },
    { name: "Automated Reels", value: isInstagramConnected ? "48" : "—", change: isInstagramConnected ? "+2" : "0", icon: PlaySquare },
  ]

  return (
    <div className={`space-y-6 ${!isInstagramConnected ? "opacity-50 pointer-events-none blur-[2px]" : ""}`}>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="p-2 bg-accent rounded-lg">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-emerald-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="font-medium">{stat.change}</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Activity Wrap-up</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-accent/30 text-muted-foreground text-sm">
            {!isInstagramConnected ? "No data — connect Instagram" : "[Chart Area: Connect Instagram to view real activity]"}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Automations</h3>
          <div className="space-y-4">
            {!isInstagramConnected ? (
              <div className="text-sm text-muted-foreground text-center py-8">No data — connect Instagram</div>
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors border border-transparent hover:border-border cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Replied to "price"</p>
                    <p className="text-xs text-muted-foreground">2 mins ago • Reel {i}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
