"use client"

import { useAppStore } from "@/store/use-app-store"
import { InstagramConnect } from "@/components/instagram-connect"
import { ArrowRight, ArrowLeft, Lightbulb, Link as LinkIcon, Check, Settings, MessageSquare, PlaySquare, SkipForward } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const { onboardingStep, setOnboardingStep, completeOnboarding, isInstagramConnected } = useAppStore()
  const router = useRouter()

  const handleNext = () => {
    if (onboardingStep < 5) setOnboardingStep(onboardingStep + 1)
  }

  const handleBack = () => {
    if (onboardingStep > 1) setOnboardingStep(onboardingStep - 1)
  }

  const handleFinish = () => {
    completeOnboarding()
    router.push("/dashboard")
  }

  const steps = [
    { id: 1, name: "Welcome" },
    { id: 2, name: "Connect" },
    { id: 3, name: "Automate" },
    { id: 4, name: "Resources" },
    { id: 5, name: "Finish" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar / Stepper */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 px-4 flex items-center justify-between z-10">
        <div className="font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          InAutoDM
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                ${onboardingStep === step.id ? "bg-primary text-primary-foreground" : 
                  onboardingStep > step.id ? "bg-emerald-500/20 text-emerald-500" : "bg-accent text-muted-foreground"}`}
              >
                {onboardingStep > step.id ? <Check className="w-3 h-3" /> : step.id}
              </span>
              <span className={onboardingStep === step.id ? "text-foreground" : ""}>
                {step.name}
              </span>
              {index < steps.length - 1 && <span className="w-4 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>

        <Link href="/dashboard" onClick={completeOnboarding} className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          Skip Setup
          <SkipForward className="w-4 h-4" />
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-card border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Ambient light effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* STEP 1: WELCOME */}
          {onboardingStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">How do you want to start?</h2>
                <p className="text-muted-foreground">Choose your path to scale your Instagram.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={handleNext} className="p-6 border-2 border-primary bg-primary/5 rounded-2xl text-left hover:bg-primary/10 transition-all group">
                  <Settings className="w-8 h-8 text-primary mb-4 group-hover:rotate-45 transition-transform" />
                  <h3 className="font-bold text-lg">Quick Setup</h3>
                  <p className="text-sm text-muted-foreground mt-1">Recommended. We'll guide you through the essentials to get running in 2 mins.</p>
                </button>
                <div onClick={handleFinish} className="p-6 border border-border bg-card rounded-2xl text-left hover:border-border/80 hover:bg-accent transition-all cursor-pointer group">
                  <PlaySquare className="w-8 h-8 text-muted-foreground mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg">Explore First</h3>
                  <p className="text-sm text-muted-foreground mt-1">Look around the dashboard without connecting anything yet.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: INSTAGRAM CONNECT */}
          {onboardingStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Connect Your Account</h2>
                <p className="text-muted-foreground">Link your Instagram to unleash powerful automations. You can securely skip for now.</p>
              </div>

              <InstagramConnect />

              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <button onClick={handleBack} className="flex flex-row items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleNext} className="flex flex-row items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95">
                  {isInstagramConnected ? "Continue" : "Skip for now"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BASIC AUTOMATION */}
          {onboardingStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Set First Reply</h2>
                <p className="text-muted-foreground">When someone comments a specific keyword, what should we DM them?</p>
              </div>

              <div className="space-y-4 bg-accent/30 p-6 rounded-2xl border border-border">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trigger Keyword</label>
                  <input type="text" placeholder="e.g., price, course, link" className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" defaultValue="price" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">DM Reply Message</label>
                  <textarea placeholder="Hey {username}! Here is the info you requested..." className="w-full px-3 py-2 h-24 resize-none bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" defaultValue={"Hey {username}! Here's the link to check our pricing: "} />
                  <p className="text-xs text-muted-foreground">Use {'{username}'} to personalize.</p>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <button onClick={handleBack} className="flex flex-row items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex gap-2">
                  <button onClick={handleNext} className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors">Skip</button>
                  <button onClick={handleNext} className="flex flex-row items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95">
                    Save & Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ADD RESOURCE */}
          {onboardingStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LinkIcon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Add a Super Resource</h2>
                <p className="text-muted-foreground">Add a resource link that users can quickly request via DM.</p>
              </div>

              <div className="space-y-4 bg-accent/30 p-6 rounded-2xl border border-border">
                 <div className="space-y-2">
                  <label className="text-sm font-medium">Resource Title</label>
                  <input type="text" placeholder="e.g., Free E-Book, Course Link" className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resource URL</label>
                  <input type="url" placeholder="https://..." className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <button onClick={handleBack} className="flex flex-row items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex gap-2">
                  <button onClick={handleNext} className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors">Skip</button>
                  <button onClick={handleNext} className="flex flex-row items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95">
                    Save & Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: FINISH */}
          {onboardingStep === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                <Check className="w-10 h-10 text-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight">You're All Set! 🎉</h2>
                <p className="text-muted-foreground">
                  Your InAutoDM workspace is ready. You can always configure more automations from your dashboard.
                </p>
              </div>

              <div className="pt-8">
                <button onClick={handleFinish} className="w-full sm:w-auto px-10 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 text-lg">
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
