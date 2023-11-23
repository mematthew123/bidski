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

export const fetchUser = async (userId: string) => {
  return await supabase
    .from('users')
    .select('name, email')
    .eq('id', userId)
    .single();
};
