'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/ui/star-rating'
import { toast } from 'sonner'

interface ReviewFormProps {
  onReviewSubmit: (review: {
    name: string
    rating: number
    comment: string
  }) => void
}

export function ReviewForm({ onReviewSubmit }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basit doğrulama
    if (!name.trim()) {
      toast.error('Lütfen adınızı girin')
      return
    }
    
    if (rating === 0) {
      toast.error('Lütfen bir derecelendirme seçin')
      return
    }
    
    if (!comment.trim()) {
      toast.error('Lütfen yorumunuzu girin')
      return
    }
    
    setIsSubmitting(true)
    
    // Sunucu tarafında bir süre gecikmeyi simüle ediyoruz
    setTimeout(() => {
      onReviewSubmit({
        name,
        rating,
        comment
      })
      
      // Formu sıfırla
      setName('')
      setRating(0)
      setComment('')
      setIsSubmitting(false)
      
      toast.success('Değerlendirmeniz başarıyla gönderildi')
    }, 1000)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Ürünü Değerlendir
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Adınız
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınızı girin"
            className="w-full"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Değerlendirmeniz
          </label>
          <div className="mb-2">
            <StarRating 
              value={rating} 
              onChange={setRating} 
              size="md" 
              className="mb-2"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {rating > 0 ? `${rating} yıldız` : 'Derecelendirme seçilmedi'}
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yorumunuz
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Bu ürün hakkında düşüncelerinizi paylaşın..."
            className="w-full min-h-[100px]"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Gönderiliyor...
              </>
            ) : (
              'Değerlendirmeyi Gönder'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 