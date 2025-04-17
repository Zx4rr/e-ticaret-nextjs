'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductType } from '@/constans';

// Context türünü tanımlıyoruz
interface FavoritesContextType {
  favorites: (number | string)[];
  addFavorite: (productOrId: ProductType | number | string) => void;
  removeFavorite: (id: number | string) => void;
  toggleFavorite: (id: number | string) => void;
  clearFavorites: () => void;
  isFavorite: (id: number | string) => boolean;
}

// Context oluşturuyoruz
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// ID'leri normalize eden yardımcı fonksiyon
const normalizeId = (id: number | string): string => id.toString();

// Provider bileşeni
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<(number | string)[]>([]);

  // localStorage'dan favori ürünleri yükleme
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // localStorage'a favori ürünleri kaydetme
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Favorilere ürün ekleme
  const addFavorite = (productOrId: ProductType | number | string) => {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const normalizedId = normalizeId(id);
    
    setFavorites((prevFavorites) => {
      // Eğer ürün zaten favorilerde varsa, tekrar eklemiyoruz
      if (prevFavorites.some(favId => normalizeId(favId) === normalizedId)) {
        return prevFavorites;
      }
      return [...prevFavorites, normalizedId];
    });
  };

  // Favorilerden ürün kaldırma
  const removeFavorite = (id: number | string) => {
    const normalizedId = normalizeId(id);
    setFavorites((prevFavorites) => 
      prevFavorites.filter((favId) => normalizeId(favId) !== normalizedId)
    );
  };

  // Favori durumunu değiştirme (varsa kaldır, yoksa ekle)
  const toggleFavorite = (id: number | string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  // Tüm favorileri temizleme
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Ürünün favorilerde olup olmadığını kontrol etme
  const isFavorite = (id: number | string) => {
    const normalizedId = normalizeId(id);
    return favorites.some(favId => normalizeId(favId) === normalizedId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        toggleFavorite, 
        clearFavorites,
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Context'i kullanmak için özel bir hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};