import { create } from 'zustand'

interface AppState {
  isInstagramConnected: boolean
  onboardingStep: number
  setOnboardingStep: (step: number) => void
  connectInstagram: () => void
  disconnectInstagram: () => void
  completeOnboarding: () => void
  hasCompletedOnboarding: boolean
}

export const useAppStore = create<AppState>((set) => ({
  isInstagramConnected: false,
  onboardingStep: 1,
  hasCompletedOnboarding: false,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  connectInstagram: () => set({ isInstagramConnected: true }),
  disconnectInstagram: () => set({ isInstagramConnected: false }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true, onboardingStep: 5 }),
}))
