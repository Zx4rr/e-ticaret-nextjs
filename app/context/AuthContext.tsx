'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { User, findUserByEmail, verifyPassword, generateToken, verifyToken, findUserById } from '@/app/lib/auth';

// Auth context türleri
interface AuthContextType {
  user: Omit<User, 'password'> | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// LocalStorage'dan kullanıcı türü
interface LocalUser {
  id: string;
  name: string;
  email: string;
  role: 'user';
}

// Context oluşturma
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sayfa yüklendiğinde token ve localStorage kontrolü
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Önce token kontrolü yap
        const token = getCookie('auth-token');
        let isAuthenticated = false;
        
        if (token) {
          const decoded = verifyToken(token as string);
          
          if (decoded && decoded.id) {
            const foundUser = findUserById(decoded.id);
            
            if (foundUser) {
              // Kullanıcı bulundu
              const userWithoutPassword = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
              };
              setUser(userWithoutPassword);
              isAuthenticated = true;
            } else {
              // Geçersiz kullanıcı, token'ı temizle
              deleteCookie('auth-token');
            }
          } else {
            // Geçersiz token, temizle
            deleteCookie('auth-token');
          }
        }
        
        // Eğer token ile auth başarısız olduysa, localStorage kontrolü yap
        if (!isAuthenticated) {
          try {
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
              const parsedUser = JSON.parse(currentUser) as LocalUser;
              setUser(parsedUser);
            }
          } catch (e) {
            console.error('Invalid user in localStorage', e);
            localStorage.removeItem('currentUser');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Öncelikle sabit kullanıcılarla giriş dene
      const foundUser = findUserByEmail(email);
      
      if (foundUser) {
        // Şifreyi doğrula
        const isPasswordValid = await verifyPassword(password, foundUser.password);
        
        if (isPasswordValid) {
          // Kullanıcı bilgilerini şifre olmadan ayarla
          const userWithoutPassword = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
          };
          
          // Token oluştur ve cookie'ye kaydet
          const token = generateToken(userWithoutPassword);
          setCookie('auth-token', token, { 
            maxAge: 60 * 60 * 24 * 7, // 7 gün
            path: '/' 
          });
          
          // Kullanıcı state'ini güncelle
          setUser(userWithoutPassword);
          
          return true;
        }
      }
      
      // LocalStorage'daki kullanıcıları dene
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as {
          id: string;
          name: string;
          email: string;
          password: string;
          role: 'user';
        }[];
        
        const localUser = users.find(u => u.email === email);
        
        if (localUser) {
          try {
            const isValidPassword = await verifyPassword(password, localUser.password);
            
            if (isValidPassword) {
              const userWithoutPassword = {
                id: localUser.id,
                name: localUser.name,
                email: localUser.email,
                role: localUser.role
              };
              
              setUser(userWithoutPassword);
              localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
              
              return true;
            }
          } catch (err) {
            console.error('Password verification error:', err);
          }
        }
      } catch (e) {
        console.error('Error checking localStorage users', e);
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    deleteCookie('auth-token');
    localStorage.removeItem('currentUser');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth Context'i kullanmak için hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 