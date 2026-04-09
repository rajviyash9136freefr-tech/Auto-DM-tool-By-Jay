"use client"

import { InstagramConnect } from "@/components/instagram-connect"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Profile Details</h3>
            <p className="text-sm text-muted-foreground">Update your personal information.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" defaultValue="you@example.com" className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium">
               <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </div>

        {/* Password Settings */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Password</h3>
            <p className="text-sm text-muted-foreground">Keep your account secure.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium">
               <Save className="w-4 h-4" /> Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="font-semibold text-lg mb-4">Integrations</h3>
        <InstagramConnect />
      </div>

    </div>
  )
}
