import React from "react";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};

export default PostPage;