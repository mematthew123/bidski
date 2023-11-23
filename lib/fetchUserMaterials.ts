import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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
  const supabase = createClientComponentClient();

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
