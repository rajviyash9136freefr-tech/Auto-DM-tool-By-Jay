"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useAppStore } from "@/store/use-app-store"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const { login } = useAppStore()
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
        
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-card-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-2 text-sm">Join InAutoDM to automate your Instagram</p>
        </div>

        <form className="space-y-4 mt-8" onSubmit={async (e) => {
          e.preventDefault();
          const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
          const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
          const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
          try {
            const { signup } = useAppStore.getState();
            await signup(name, email, password);
            router.push('/dashboard');
          } catch (error) {
            alert('Signup failed. Email might already be in use.');
          }
        }}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="you@example.com" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="w-full mt-6 bg-primary text-primary-foreground font-medium py-2.5 rounded-lg transition-transform active:scale-95 hover:bg-primary/90 flex items-center justify-center gap-2">
            Sign Up
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-col items-center justify-center gap-2 text-sm mt-6">
          <div>
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
