import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

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

interface Cart {
  id: string;
  user_id: string;
}

export async function addToCart(userId: string, billboardId: number, startDate: Date, endDate: Date) {
  // Önce kullanıcının sepetini bul veya oluştur
  let { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (cartError || !cart) {
    // Sepet bulunamadıysa veya hata oluştuysa, yeni bir sepet oluştur
    const { data: newCart, error: newCartError } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select('id')
      .single();

    if (newCartError || !newCart) {
      throw newCartError || new Error('Failed to create new cart');
    }
    cart = newCart;
  }

  // Sepete ürün ekle
  const { error: itemError } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cart.id,
      billboard_id: billboardId,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    });

  if (itemError) throw itemError;

  // Sepet öğe sayısını döndür
  const { count, error: countError } = await supabase
    .from('cart_items')
    .select('id', { count: 'exact' })
    .eq('cart_id', cart.id);

  if (countError) throw countError;

  return count || 0;
}
export async function getCartItemCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('cart_items')
    .select('id', { count: 'exact' })
    .eq('cart.user_id', userId);

  if (error) throw error;

  return count || 0;

}