import Link from "next/link"
import { Lock } from "lucide-react"

export function InstagramLock({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
        <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground w-full max-w-sm">{description}</p>

        <Link href="/dashboard/settings" className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Connect Instagram
        </Link>
    </div>
  )
}
