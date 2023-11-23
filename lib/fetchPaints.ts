import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const fetchPaints = async (userId: any) => {
  const supabase = createClientComponentClient();
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
