'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in'
  delay?: number // in ms
  duration?: number // in ms
  once?: boolean
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once])

  // Get initial transform offset based on variant
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)'
    switch (variant) {
      case 'fade-up':
        return 'translate3d(0, 40px, 0) scale(1)'
      case 'fade-down':
        return 'translate3d(0, -40px, 0) scale(1)'
      case 'fade-left':
        return 'translate3d(-40px, 0, 0) scale(1)'
      case 'fade-right':
        return 'translate3d(40px, 0, 0) scale(1)'
      case 'zoom-in':
        return 'translate3d(0, 20px, 0) scale(0.92)'
      default:
        return 'translate3d(0, 40px, 0) scale(1)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
