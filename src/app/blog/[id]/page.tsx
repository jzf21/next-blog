import { Metadata } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: {
        revalidate: 3600
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

export async function generateStaticParams() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: {
        revalidate: 3600
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

// Add metadata generation
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);
  
  return {
    title: post?.title ?? 'Post Not Found',
    description: post?.body?.slice(0, 160) ?? 'Post content not available',
  };
}

// Use the correct params type for Next.js pages
export default async function Page({ params }: {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const post = await getPost(params.id);

  if (!post) {
    throw new Error('Failed to fetch post');
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </main>
  );
}