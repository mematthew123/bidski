'use client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const supabase = createClientComponentClient();

interface User {
  id: string;
  name: string;
  email: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user as any);
    };

    fetchUser();
  }, []);

  return user;
};

export default useUser;

export interface MaterialPrices {
  primer_price: number;
  tape_price: number;
  rollers_price: number;
  brushes_price: number;
  user_id: string;
  caulk_price: number;
}

export const fetchUserMaterials = async (
  userId: string
): Promise<MaterialPrices> => {
  const { data, error } = await supabase
    .from('materials')
    .select(
      'primer_price, tape_price, rollers_price, brushes_price, caulk_price'
    )
    .eq('user_id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data as MaterialPrices;
};

export const fetchUser = async (userId: string) => {
  return await supabase
    .from('users')
    .select('name, email')
    .eq('id', userId)
    .single();
};

export const fetchPaints = async (userId: any) => {
  const { data, error } = await supabase
    .from('paint_types')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching paints:', error);
    throw error;
  }

  return data;
};
