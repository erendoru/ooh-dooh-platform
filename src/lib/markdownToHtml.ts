import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  console.log("Input markdown length:", markdown.length);
  const result = await remark().use(html).process(markdown);
  const processedContent = result.toString();
  console.log("Processed HTML length:", processedContent.length);
  return processedContent;
}