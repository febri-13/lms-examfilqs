'use client'

import React, { useEffect } from 'react'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

const icons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
}

const Toast = () => {
  const { message, type, isVisible, hideToast } = useToast()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, hideToast])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-5 z-[9999] animate-toast-in">
      <div
        className={cn(
          'flex items-center gap-3 bg-surface border rounded-xl px-4 py-3 shadow-lg min-w-[280px]',
          type === 'success' && 'border-success/30',
          type === 'error' && 'border-error/30',
          type === 'info' && 'border-primary-500/30'
        )}
      >
        <span className="text-xl">{icons[type]}</span>
        <span className="text-sm font-medium text-text-primary">{message}</span>
      </div>
    </div>
  )
}

export default Toast