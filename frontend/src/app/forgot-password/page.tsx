"use client"

import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
        
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-card-foreground">Reset Password</h2>
          <p className="text-muted-foreground mt-2 text-sm">We'll send you an email to reset your password.</p>
        </div>

        <form className="space-y-4 mt-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="you@example.com" 
            />
          </div>

          <button className="w-full mt-6 bg-primary text-primary-foreground font-medium py-2.5 rounded-lg transition-transform active:scale-95 hover:bg-primary/90 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Send Reset Link
          </button>
        </form>

        <div className="flex justify-center text-sm mt-6">
          <Link href="/login" className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
