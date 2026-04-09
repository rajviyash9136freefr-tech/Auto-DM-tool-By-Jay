import { create } from 'zustand'

interface AppState {
  isAuthenticated: boolean
  isInstagramConnected: boolean
  onboardingStep: number
  setOnboardingStep: (step: number) => void
  connectInstagram: () => void
  disconnectInstagram: () => void
  completeOnboarding: () => void
  hasCompletedOnboarding: boolean
  login: () => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  isInstagramConnected: false,
  onboardingStep: 1,
  hasCompletedOnboarding: false,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  connectInstagram: () => set({ isInstagramConnected: true }),
  disconnectInstagram: () => set({ isInstagramConnected: false }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true, onboardingStep: 5 }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}))
