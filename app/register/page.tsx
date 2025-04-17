'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { hashPassword } from '@/app/lib/auth'

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
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  password: z.string().min(6, { message: 'Şifreniz en az 6 karakter olmalıdır' }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: 'Kullanım koşullarını kabul etmelisiniz' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form tanımlaması
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  // Form gönderme işlemi
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    try {
      // Kullanıcı şifresini hashle
      const hashedPassword = await hashPassword(values.password);
      
      // Yeni kullanıcı oluştur
      const newUser = {
        id: Date.now().toString(), // Basit bir ID
        name: values.name,
        email: values.email,
        password: hashedPassword,
        role: 'user' as const
      };
      
      // API çağrısı - normalde burada backend'e istek yapılır
      // Şimdilik localStorage'a kaydedelim
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // E-posta kontrolü
      if (existingUsers.some((user: {email: string}) => user.email === values.email)) {
        toast.error('Bu e-posta adresi zaten kullanılıyor', {
          duration: 3000,
          position: 'top-center',
        });
        setIsLoading(false);
        return;
      }
      
      // Kullanıcıyı kaydet
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      
      // Başarılı kayıt
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.', {
        duration: 3000,
        position: 'top-center',
      })
      
      // Giriş sayfasına yönlendir
      router.push('/login')
    } catch (error) {
      toast.error('Kayıt sırasında bir hata oluştu', {
        duration: 3000,
        position: 'top-center',
      })
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
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
              <UserPlus className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hesap Oluşturun
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Rulman Merkezi&apos;ne üye olun ve avantajlardan yararlanın
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Adınız Soyadınız</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ahmet Yılmaz"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Şifre Tekrar</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="******"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
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

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Kullanım koşullarını
                        </Link>{" "}
                        ve{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          gizlilik politikasını
                        </Link>{" "}
                        kabul ediyorum
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 mt-3"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Kayıt oluşturuluyor...
                </div>
              ) : (
                "Hesap Oluştur"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 