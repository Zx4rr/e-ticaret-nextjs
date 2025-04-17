'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  onChange?: (rating: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  count?: number
  className?: string
}

export function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = 'md',
  count = 5,
  className
}: StarRatingProps) {
  const [rating, setRating] = useState(value)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    setRating(value)
  }, [value])

  const handleMouseEnter = (index: number) => {
    if (readOnly) return
    setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverRating(0)
  }

  const handleClick = (index: number) => {
    if (readOnly) return
    const newRating = index
    setRating(newRating)
    onChange?.(newRating)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4'
      case 'lg':
        return 'h-8 w-8'
      case 'md':
      default:
        return 'h-6 w-6'
    }
  }

  const sizeClass = getSizeClasses()

  return (
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: count }).map((_, index) => {
        const starValue = index + 1
        const filled = (hoverRating || rating) >= starValue
        
        return (
          <div
            key={index}
            className={cn(
              'cursor-pointer transition-transform',
              readOnly ? 'cursor-default' : 'hover:scale-110',
              filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            <Star 
              className={cn(
                sizeClass,
                filled ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent'
              )} 
            />
          </div>
        )
      })}
    </div>
  )
} 