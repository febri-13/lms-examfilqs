export interface Teacher {
  id: string
  username: string
  password: string
  name: string
  created_at?: string
}

export interface Student {
  id: string
  nis: string
  password: string
  name: string
  class?: string | null
  created_at?: string
}

// Union type untuk User
export type User = Teacher | Student

// Type guard untuk mengecek role
export const isTeacher = (user: User): user is Teacher => {
  return 'username' in user
}

export const isStudent = (user: User): user is Student => {
  return 'nis' in user
}

export type UserRole = 'teacher' | 'student' | null

export interface AuthState {
  user: User | null
  role: UserRole
  isLoading: boolean
  error: string | null
  login: (identifier: string, password: string, role: 'teacher' | 'student') => Promise<boolean>
  logout: () => void
  clearError: () => void
}

export interface ToastState {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  hideToast: () => void
}