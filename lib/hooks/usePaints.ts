'use client';
import { useState, useEffect } from 'react';
import { fetchPaints } from '@/lib/fetchPaints';

const usePaints = (userId: string) => {
  const [paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchPaints(userId)
      .then((data) => {
        setPaints(data as any);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  return { paints, loading, error };
};

export default usePaints;
