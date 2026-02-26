'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, id, ...props }, ref) => {
    // ✅ Gunakan useId() dari React untuk generate unique ID yang stabil
    const generatedId = useId()
    const inputId = id || `input-${generatedId}`
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-text-secondary mb-2 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'w-full px-4 py-3 bg-surface-2 border rounded-xl text-text-primary text-sm',
              'transition-all duration-200 outline-none placeholder:text-text-tertiary',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              error
                ? 'border-error/50 focus:border-error focus:ring-error/20'
                : 'border-primary-500/20',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-1 text-xs text-error-light"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input