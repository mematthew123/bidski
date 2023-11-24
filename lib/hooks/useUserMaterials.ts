'use client';

import { useState, useEffect } from 'react';
import { fetchUserMaterials } from '@/lib/fetchUserMaterials';

const useUserMaterials = (userId: string) => {
  const [materials, setMaterials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchUserMaterials(userId)
      .then((data) => {
        setMaterials(data as any);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  return { materials, loading, error };
};

export default useUserMaterials;
