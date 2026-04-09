"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
        
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-card-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your InAutoDM account</p>
        </div>

        <form className="space-y-4 mt-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="you@example.com" 
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              id="password"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>

          <Link href="/dashboard" className="w-full mt-6 bg-primary text-primary-foreground font-medium py-2.5 rounded-lg transition-transform active:scale-95 hover:bg-primary/90 flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
