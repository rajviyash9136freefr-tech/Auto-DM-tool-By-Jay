"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquareShare, 
  LogOut,
  Bell,
  Lock
} from "lucide-react"
import { useAppStore } from "@/store/use-app-store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Media", href: "/dashboard/media", icon: ImageIcon },
  { name: "Automations", href: "/dashboard/automations", icon: MessageSquareShare },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isInstagramConnected, isAuthenticated, logout } = useAppStore()

  useEffect(() => {
    // Basic protection logic
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null // Prevent flash of dashboard

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      {/* Sidebar - Desktop hidden on mobile mostly, we'll keep it simple for now */}
      <aside className="w-full md:w-64 border-b md:border-r border-border bg-card/50 backdrop-blur-xl flex flex-col md:h-screen sticky top-0 z-20">
        <div className="p-6 flex items-center border-b border-border">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            InAutoDM
          </h2>
        </div>
        
        <nav className="p-4 flex-1 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col items-center md:items-stretch">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : ""}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto hidden md:block">
          <button
            onClick={() => {
              logout()
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Announcement Bar */}
        {!isInstagramConnected && pathname !== '/dashboard/settings' && (
           <div className="bg-primary/10 border-b border-primary/20 p-2 flex justify-center items-center">
              <span className="text-sm font-medium mr-4">Connect Instagram to unlock automation</span>
              <Link href="/dashboard/settings" className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">
                 Connect Instagram
              </Link>
           </div>
        )}

        {/* Top Navbar */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize hidden sm:block">
              {pathname.split('/').pop() || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className={`${!isInstagramConnected ? "opacity-50 cursor-not-allowed" : ""} p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors relative`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 bg-accent/20 relative">
          {children}

          {/* Dashboard Lock Overlay */}
          {!isInstagramConnected && pathname !== '/dashboard/settings' && (
            <div className="absolute inset-0 z-30 flex items-start mt-32 justify-center pointer-events-none">
                <div className="bg-card border border-border shadow-2xl rounded-2xl p-8 max-w-md w-full text-center pointer-events-auto flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Connect Instagram to unlock features</h3>
                    <p className="text-muted-foreground text-sm mb-6">You are in preview mode. Connect your account to enable automations, view real data, and capture leads.</p>
                    <Link href="/dashboard/settings" className="block w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all">
                        Connect Instagram
                    </Link>
                </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
