"use client"

import { useAppStore } from "@/store/use-app-store"
import { Download, Search, CheckCircle, Circle } from "lucide-react"

const mockLeads = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  username: `@user_${Math.floor(Math.random() * 10000)}`,
  resource: i % 2 === 0 ? "Free AI Masterclass" : "Starter Checklist",
  status: i % 3 === 0 ? "Clicked" : "Captured",
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
}))

import { InstagramLock } from "@/components/instagram-lock"

export default function LeadsPage() {
  const { isInstagramConnected } = useAppStore()

  return (
    <div className={`space-y-6 ${!isInstagramConnected ? "opacity-50 pointer-events-none blur-[2px]" : ""}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads Database</h2>
          <p className="text-muted-foreground text-sm mt-1">Users who interacted with your Super Profile resources.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card rounded-lg hover:bg-accent transition-colors font-medium text-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex gap-4">
              <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Search leads..." className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-accent/50 text-muted-foreground font-medium border-b border-border">
                      <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Resource Requested</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      {mockLeads.map(lead => (
                          <tr key={lead.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                              <td className="px-6 py-4 font-medium">{lead.username}</td>
                              <td className="px-6 py-4 text-muted-foreground">{lead.resource}</td>
                              <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${lead.status === 'Clicked' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                      {lead.status === 'Clicked' ? <CheckCircle className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                                      {lead.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">{lead.date}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}
