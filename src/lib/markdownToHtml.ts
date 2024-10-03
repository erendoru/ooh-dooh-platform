import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  console.log("Input markdown:", markdown); // Giriş markdown'ını kontrol etmek için log ekledik
  const result = await remark().use(html).process(markdown);
  const processedContent = result.toString();
  console.log("Processed HTML:", processedContent); // İşlenmiş HTML'i kontrol etmek için log ekledik
  return processedContent;
}