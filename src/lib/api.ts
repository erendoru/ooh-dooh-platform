import { supabase } from './supabase';

export async function getAllPosts() {
  console.log('Tüm gönderiler çekiliyor...');
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) {
      console.error('Gönderiler çekilirken hata:', error);
      return [];
    }

    console.log('Çekilen gönderiler:', data);
    return data || [];
  } catch (error) {
    console.error('getAllPosts fonksiyonunda beklenmeyen hata:', error);
    return [];
  }
}
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}