"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Post = {
  title: string;
  date: string;
  content: string;
  author: string;
  image_url: string; // Yeni eklenen alan
};

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log("Gönderi çekiliyor...");
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        console.log("Çekilen gönderi:", data);
        setPost(data);
      } catch (err) {
        console.error("Gönderi çekilirken hata oluştu:", err);
        setError("Gönderi yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-24 mt-20">Yükleniyor...</div>
    );
  if (error)
    return (
      <div className="container mx-auto px-4 py-24 mt-20 text-red-500">
        {error}
      </div>
    );
  if (!post)
    return (
      <div className="container mx-auto px-4 py-24 mt-20">
        Gönderi bulunamadı.
      </div>
    );

  return (
    <article className="container mx-auto px-4 py-24 mt-20 max-w-3xl">
      {post.image_url && (
        <div className="mb-8 relative w-full h-64 md:h-96">
          <Image
            src={post.image_url}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      )}
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-[#3B82F6]">{post.title}</h1>
        <div className="text-gray-500 text-sm">
          <span>
            {new Date(post.date).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.author && <span className="mx-2">•</span>}
          {post.author && <span>{post.author}</span>}
        </div>
      </header>
      <div
        className="prose prose-lg max-w-none text-gray-800 font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
