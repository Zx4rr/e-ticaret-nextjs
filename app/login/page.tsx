'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { verifyPassword } from '@/app/lib/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

// Form şema doğrulaması
const formSchema = z.object({
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  password: z.string().min(6, { message: 'Şifreniz en az 6 karakter olmalıdır' }),
  rememberMe: z.boolean().default(false),
})

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form tanımlaması
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Form gönderme işlemi
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    try {
      // Öncelikle oturum açmayı normal auth context ile deneyin
      const success = await login(values.email, values.password)
      
      // Eğer oturum açma başarısız olursa, localStorage'dan kullanıcıları kontrol edin
      if (!success) {
        // LocalStorage'dan kullanıcıları al
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: {email: string}) => u.email === values.email);
        
        if (user) {
          // Şifreyi doğrula
          const isValidPassword = await verifyPassword(values.password, user.password);
          
          if (isValidPassword) {
            // Başarılı giriş
            toast.success('Giriş başarılı!', {
              duration: 3000,
              position: 'top-center',
            });
            
            // Cookie'ye localStorage'daki kullanıcıyı kaydet
            const userWithoutPassword = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            };
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            
            router.push('/'); // Ana sayfaya yönlendir
            return;
          }
        }
        
        // Başarısız giriş
        toast.error('E-posta veya şifre hatalı', {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        // Başarılı giriş (normal auth context ile)
        toast.success('Giriş başarılı!', {
          duration: 3000,
          position: 'top-center',
        });
        router.push('/'); // Ana sayfaya yönlendir
      }
    } catch (error) {
      toast.error('Giriş yapılırken bir hata oluştu', {
        duration: 3000,
        position: 'top-center',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <LogIn className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hesabınıza Giriş Yapın
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Rulman Merkezi&apos;ne hoşgeldiniz
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">E-posta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ornek@email.com"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Şifre</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                    >
                      Beni hatırla
                    </label>
                  </div>
                )}
              />
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Şifremi unuttum
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Giriş yapılıyor...
                </div>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Demo Hesap Bilgileri:</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 mx-auto max-w-xs">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600 dark:text-gray-300">E-posta:</span>
                  <code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono">admin@example.com</code>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Şifre:</span>
                  <code className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono">admin123</code>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bu demo hesap ile sistemin tüm özelliklerini test edebilirsiniz.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 