import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getBillboards() {
  const { data, error } = await supabase
    .from('billboards')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getBillboardViews(billboardId: number, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('billboard_views')
    .select('view_date, view_count')
    .eq('billboard_id', billboardId)
    .gte('view_date', startDate)
    .lte('view_date', endDate);
  
  if (error) throw error;
  return data;
}

export type Profile = {
  id: string;
  name: string;
  surname: string;
  phone: string;
  updated_at: string;
};
