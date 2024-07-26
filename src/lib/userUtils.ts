
import { supabase } from './supabase';

export async function getUserType(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_billboard_owner')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data?.is_billboard_owner ? 'billboard_owner' : 'customer';
  } catch (error) {
    console.error('Error fetching user type:', error);
    return null;
  }
}