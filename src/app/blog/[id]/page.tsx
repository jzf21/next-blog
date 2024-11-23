"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

const getPost = async (id: string): Promise<Post | null> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

const PostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id as string).then((data) => {
        if (data) {
          setPost(data);
        } else {
          notFound();
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};

export default PostPage;