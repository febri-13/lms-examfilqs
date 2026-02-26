'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import Toast from '@/components/ui/Toast'
import { useAuthStore } from '@/lib/store/authStore'

export default function HomePage() {
  const router = useRouter()
  const { user, role } = useAuthStore()

  useEffect(() => {
    // Jika sudah login, redirect ke halaman sesuai role
    if (user && role) {
      if (role === 'teacher') {
        router.push('/guru/dashboard')
      } else {
        router.push('/siswa/beranda')
      }
    }
  }, [user, role, router])

  return (
    <>
      {/* Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Main Container */}
      <main className="min-h-screen flex items-center justify-center p-5 relative z-10">
        <LoginForm />
      </main>

      {/* Toast Notification */}
      <Toast />
    </>
  )
}