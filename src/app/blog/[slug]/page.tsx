import { getPostBySlug, getAllPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

type Params = {
  params: {
    slug: string;
  };
};

export default async function BlogPost({ params }: Params) {
  console.log("Fetching post for slug:", params.slug);
  const post = await getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
  ]);
  console.log("Fetched post:", post);

  if (!post.content) {
    console.error("No content found for post");
    return <div>İçerik bulunamadı.</div>;
  }

  const content = await markdownToHtml(post.content || "");
  console.log("Processed HTML content length:", content.length);

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">
        {post.title || "Başlık bulunamadı"}
      </h1>
      <p className="text-gray-600 mb-8">
        {post.date
          ? new Date(post.date).toLocaleDateString("tr-TR")
          : "Tarih belirtilmemiş"}
      </p>
      {content ? (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p>İçerik yüklenirken bir hata oluştu.</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
