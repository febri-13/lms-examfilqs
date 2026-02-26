import { create } from 'zustand'
import { ToastState } from '@/types'

export const useToast = create<ToastState>((set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  
  showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    set({ message, type, isVisible: true })
    
    // Auto hide setelah 3 detik
    setTimeout(() => {
      set({ isVisible: false })
    }, 3000)
  },
  
  hideToast: () => set({ isVisible: false })
}))