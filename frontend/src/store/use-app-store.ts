import { create } from 'zustand'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface AppState {
  isAuthenticated: boolean
  isInstagramConnected: boolean
  connectedAccount: any | null
  token: string | null
  onboardingStep: number
  hasCompletedOnboarding: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  fetchAccount: () => Promise<void>
  disconnectInstagram: () => Promise<void>
  
  // Helpers
  setOnboardingStep: (step: number) => void
  completeOnboarding: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isInstagramConnected: false,
  connectedAccount: null,
  onboardingStep: 1,
  hasCompletedOnboarding: false,

  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, { email, password })
    const { token, user } = res.data.data
    localStorage.setItem('token', token)
    set({ isAuthenticated: true, token, onboardingStep: user.onboardingStep || 1 })
  },

  signup: async (name, email, password) => {
    const res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password })
    const { token } = res.data.data
    localStorage.setItem('token', token)
    set({ isAuthenticated: true, token, onboardingStep: 1 })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ isAuthenticated: false, token: null, isInstagramConnected: false, connectedAccount: null })
  },

  fetchAccount: async () => {
    const { token } = get()
    if (!token) return

    try {
      const res = await axios.get(`${API_URL}/api/instagram/account`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.data) {
        set({ isInstagramConnected: true, connectedAccount: res.data.data })
      } else {
        set({ isInstagramConnected: false, connectedAccount: null })
      }
    } catch (error) {
      console.error('Failed to fetch account')
    }
  },

  disconnectInstagram: async () => {
    const { token } = get()
    if (!token) return

    await axios.delete(`${API_URL}/api/instagram/disconnect`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    set({ isInstagramConnected: false, connectedAccount: null })
  },

  setOnboardingStep: (step) => set({ onboardingStep: step }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true, onboardingStep: 5 }),
}))

