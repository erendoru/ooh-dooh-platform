import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import path from 'path';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');
export function getPostSlugs() {
    const slugs = fs.readdirSync(postsDirectory);
    return slugs.filter(slug => 
      slug.endsWith('.md') && !slug.startsWith('.')
    );
  }

  export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    
    console.log("Trying to read file:", fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return {};
    }
  
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log("File contents:", fileContents);
  
    const { data, content } = matter(fileContents);
    console.log("Parsed data:", data);
    console.log("Parsed content:", content);
  
    const items: { [key: string]: any } = {};
  
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }
      if (data[field]) {
        items[field] = data[field];
      }
    });
  
    console.log("Returned items:", items);
    return items;
  }
export function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs();
    const posts = slugs
      .map((slug) => getPostBySlug(slug, fields))
      .sort((post1, post2) => ((post1.date || '') > (post2.date || '') ? -1 : 1));
    return posts;
  }