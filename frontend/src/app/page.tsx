import Link from "next/link"
import { ArrowRight, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] mix-blend-screen pointer-events-none" />
      
      <main className="z-10 max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            InAutoDM
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            AI-powered Instagram Automation platform to scale your business effortlessly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/signup"
            className="group relative flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-primary-foreground font-medium transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Start Setup
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          
          <Link
            href="/dashboard"
            className="group flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card px-8 text-card-foreground font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-95 w-full sm:w-auto"
          >
            Explore Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </div>
  )
}
