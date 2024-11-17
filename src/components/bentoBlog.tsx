"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { IconArticle } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
};

export function BentoBlogGrid() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, image_url")
        .order("date", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
    }

    fetchPosts();
  }, []);

  return (
    <BentoGrid className="max-w-4xl mx-auto mb-20 grid-cols-3 grid-rows-[auto_auto]">
      {posts.slice(0, 3).map((post, i) => (
        <BentoGridItem
          key={post.id}
          title={
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline text-center block"
            >
              {post.title}
            </Link>
          }
          description={<div className="text-center">{post.excerpt}</div>}
          header={
            <div className="relative w-full h-48">
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              )}
            </div>
          }
          className="flex flex-col items-center justify-center text-center"
          icon={<IconArticle className="h-4 w-4 text-neutral-500 mx-auto" />}
        />
      ))}
      {posts[3] && (
        <BentoGridItem
          key={posts[3].id}
          title={
            <Link
              href={`/blog/${posts[3].slug}`}
              className="hover:underline text-center block"
            >
              {posts[3].title}
            </Link>
          }
          description={<div className="text-center">{posts[3].excerpt}</div>}
          header={
            <div className="relative w-full h-48">
              {posts[3].image_url && (
                <Image
                  src={posts[3].image_url}
                  alt={posts[3].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              )}
            </div>
          }
          className="col-span-2 flex flex-col items-center justify-center text-center"
          icon={<IconArticle className="h-4 w-4 text-neutral-500 mx-auto" />}
        />
      )}
      {posts[4] && (
        <BentoGridItem
          key={posts[4].id}
          title={
            <Link
              href={`/blog/${posts[4].slug}`}
              className="hover:underline text-center block"
            >
              {posts[4].title}
            </Link>
          }
          description={<div className="text-center">{posts[4].excerpt}</div>}
          header={
            <div className="relative w-full h-48">
              {posts[4].image_url && (
                <Image
                  src={posts[4].image_url}
                  alt={posts[4].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              )}
            </div>
          }
          className="flex flex-col items-center justify-center text-center"
          icon={<IconArticle className="h-4 w-4 text-neutral-500 mx-auto" />}
        />
      )}
    </BentoGrid>
  );
}
