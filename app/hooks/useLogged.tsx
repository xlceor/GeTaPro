"use client"


import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/app/lib/types'

type UserContextType = {
  user: User;
  login: (userData: NonNullable<User>) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // 🧠 Cargar del localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('user');
    console.log('Cargando desde localStorage:', stored);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.warn('Datos corruptos en localStorage... como SHIELD en Hydra.', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // ✅ Guardar en localStorage cuando el usuario cambie
  useEffect(() => {
    if (user) {
      console.log('Guardando en localStorage:', user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData: NonNullable<User>) => {
    setUser(userData);
    console.log("userData ", userData)
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 🔧 Hook personalizado
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  console.log("useUser ", context)
  return context;
};