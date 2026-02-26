import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User, Teacher, Student } from '@/types'
import { supabase } from '@/lib/supabase/client'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoading: false,
      error: null,

      login: async (identifier: string, password: string, role: 'teacher' | 'student') => {
        set({ isLoading: true, error: null })
        
        try {
          let user: User | null = null
          
          if (role === 'teacher') {
            // Login guru - cek ke tabel teachers
            const { data, error } = await supabase
              .from('teachers')
              .select('*')
              .eq('username', identifier)
              .eq('password', password)
              .single()
            
            if (error) throw new Error('Username atau password salah')
            if (!data) throw new Error('Guru tidak ditemukan')
            
            user = data as Teacher
          } else {
            // Login siswa - cek ke tabel students
            const { data, error } = await supabase
              .from('students')
              .select('*')
              .eq('nis', identifier)
              .eq('password', password)
              .single()
            
            if (error) throw new Error('NIS atau password salah')
            if (!data) throw new Error('Siswa tidak ditemukan')
            
            user = data as Student
          }
          
          // Cara 1: Hapus password tanpa mendeklarasikan variable
          if (user && 'password' in user) {
            // Buat object baru tanpa password
            const userWithoutPassword = Object.fromEntries(
              Object.entries(user).filter(([key]) => key !== 'password')
            ) as User
            user = userWithoutPassword
          }
          
          set({ user, role, isLoading: false, error: null })
          
          // Redirect berdasarkan role
          if (role === 'teacher') {
            window.location.href = '/guru/dashboard'
          } else {
            window.location.href = '/siswa/beranda'
          }
          
          return true
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login gagal', 
            isLoading: false 
          })
          return false
        }
      },

      logout: () => {
        set({ user: null, role: null })
        window.location.href = '/'
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'examfilqs-auth',
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
)