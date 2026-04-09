"use client"

import { useAppStore } from "@/store/use-app-store"
import { BarChart3, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const { isInstagramConnected } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-1">Track your automation performance and growth.</p>
        </div>
        <select className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>All Time</option>
        </select>
      </div>

      {!isInstagramConnected && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
           <h3 className="font-semibold text-primary">Demo Analytics</h3>
           <p className="text-sm text-muted-foreground mt-1">Connect Instagram to view your real account performance.</p>
        </div>
      )}

      {/* Main Charts Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
             <h3 className="font-semibold">Engagement Growth</h3>
             <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="h-64 flex items-end gap-2 text-primary">
             {[30, 45, 25, 60, 40, 75, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all" style={{ height: `${h}%` }} />
             ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
             <h3 className="font-semibold">Automation Success Rate</h3>
             <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-6 mt-8">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="font-medium">Comments Replied</span>
                   <span className="text-muted-foreground">94%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                   <div className="w-[94%] h-full bg-emerald-500" />
                </div>
             </div>
             
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="font-medium">DMs Sent</span>
                   <span className="text-muted-foreground">88%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                   <div className="w-[88%] h-full bg-primary" />
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="font-medium">Links Clicked</span>
                   <span className="text-muted-foreground">42%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                   <div className="w-[42%] h-full bg-purple-500" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
