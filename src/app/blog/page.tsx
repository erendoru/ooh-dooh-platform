"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
};

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log("Gönderiler çekiliyor...");
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("date", { ascending: false });

        if (error) throw error;

        console.log("Çekilen gönderiler:", data);
        setPosts(data || []);
      } catch (err) {
        console.error("Gönderiler çekilirken hata oluştu:", err);
        setError("Gönderiler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-[#3B82F6]">Panom Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
          Henüz blog yazısı bulunmamaktadır.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block">
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gray-100">
                <h2 className="text-2xl font-semibold mb-2 text-[#3B82F6]">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-600">
                  {new Date(post.date).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
