import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Ortam değişkenleri (gerçekte .env dosyasında saklanmalı)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '7d'; // Token geçerlilik süresi: 7 gün

// Kullanıcı arayüzü
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user';
}

// Örnek kullanıcılar (gerçekte veritabanından gelecek)
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    // şifre: admin123
    password: '$2a$10$rjM9iIWq.YMlYPfQzO5YvuLLcJnvE89OVrvKSvDV9hg4RtUy6Xnx2',
    role: 'user',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    // şifre: user123
    password: '$2a$10$rHH2KlL1H4NvPbKVkAXg1O9.oHXgQrIvhrouxD0pSKnwLQvJnFyQu',
    role: 'user',
  },
];

// Şifre hashleme
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Şifre doğrulama
export const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

// JWT token oluşturma
export const generateToken = (user: Omit<User, 'password'>): string => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// JWT token doğrulama
export const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch {
    return null;
  }
};

// Kullanıcı bulma
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// Kullanıcı bulma (ID ile)
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
}; 