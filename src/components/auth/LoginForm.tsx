'use client'

import React, { useState } from 'react'
import { useAuthStore } from '@/lib/store/authStore'
import { useToast } from '@/hooks/useToast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const LoginForm = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  
  const { login, isLoading, error, clearError } = useAuthStore()
  const { showToast } = useToast()

  const handleRoleChange = (newRole: 'student' | 'teacher') => {
    setRole(newRole)
    setIdentifier('')
    setPassword('')
    setLocalError('')
    clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    // Validasi
    if (!identifier.trim()) {
      setLocalError(role === 'student' ? 'NIS harus diisi' : 'Username harus diisi')
      return
    }

    if (!password.trim()) {
      setLocalError('Password harus diisi')
      return
    }

    const success = await login(identifier, password, role)
    
    if (!success) {
      showToast('Login gagal, periksa kembali data Anda', 'error')
    }
  }

  return (
    <div className="glass-card w-full max-w-[420px] p-12 animate-slide-up">
      {/* Logo */}
      <div className="text-center mb-9">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-primary-500/30">
          🎓
        </div>
        <h1 className="font-serif text-3xl font-bold text-gradient">
          ExamFILQ'S
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Platform Ujian Digital
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex bg-surface-2 rounded-lg p-1 mb-7 border border-primary-500/20">
        <button
          type="button"
          onClick={() => handleRoleChange('student')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === 'student'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          👤 Siswa
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('teacher')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === 'teacher'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          🏫 Guru
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Identifier Field */}
        <Input
          label={role === 'student' ? 'NIS (Nomor Induk Siswa)' : 'Username'}
          type="text"
          placeholder={role === 'student' ? 'Masukkan NIS Anda' : 'Masukkan username'}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={localError || error || undefined}
          icon={role === 'student' ? '👤' : '👨‍🏫'}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="🔒"
        />

        {/* Error Message (from store) */}
        {error && !localError && (
          <div className="bg-error/10 border border-error/30 text-error-light px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
        >
          Masuk →
        </Button>

        {/* Demo Info */}
        <div className="text-center mt-4">
          <p className="text-text-tertiary text-xs">
            Demo Akun:
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs">
            <div className="bg-surface-2/50 px-3 py-1.5 rounded-lg border border-primary-500/10">
              <span className="text-primary-400 font-medium">Siswa:</span>
              <span className="text-text-secondary ml-1">12345 / siswa123</span>
            </div>
            <div className="bg-surface-2/50 px-3 py-1.5 rounded-lg border border-primary-500/10">
              <span className="text-primary-400 font-medium">Guru:</span>
              <span className="text-text-secondary ml-1">admin / admin123</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm