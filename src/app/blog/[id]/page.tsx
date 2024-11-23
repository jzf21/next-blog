import React from "react";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

// This should be in a separate generateStaticParams.ts file or
// added as a named export in the page file
export async function generateStaticParams() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    const posts: Post[] = await res.json();

    return posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate params:', error);
    return [];
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

// This needs to be a Server Component
export default async function Page({ params }: PageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </main>
  );
}