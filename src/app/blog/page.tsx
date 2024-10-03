import Link from "next/link";
import { getAllPosts } from "@/lib/api";

type Post = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
};

export default async function BlogIndex() {
  const posts = (await getAllPosts([
    "title",
    "date",
    "slug",
    "excerpt",
  ])) as Post[];

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Panom Blog</h1>
      {posts.length === 0 ? (
        <p>Henüz blog yazısı bulunmamaktadır.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-500">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("tr-TR")
                    : "Tarih belirtilmemiş"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
