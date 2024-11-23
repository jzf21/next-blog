"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

interface TipTapProps {
  initialContent?: string;
  editable?: boolean;
}

const TipTap: React.FC<TipTapProps> = ({ initialContent = '', editable = true }) => {
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
    ],
    content: initialContent,
    editable: editable,
  });

  const handleSave = () => {
    if (!editor) {
      console.log('Editor is not initialized');
      return;
    }

    console.log('Saving blog post...');
    // Get the HTML content from the editor
    const content = editor.getHTML();

    // Log the blog post details
    console.log('Blog Post Details:', {
      title: title,
      content: content
    });

    // Here you would typically send the data to your backend
    // For example:
    // await saveBlogPost({ title, content });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {editable && (
        <div className="mb-4">
          <input
            placeholder="Enter blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
      
      <div className="border rounded-lg p-4 mb-4 min-h-[300px]">
        <EditorContent 
          editor={editor} 
          className="prose max-w-none" 
        />
      </div>
      
      {editable && (
        <div className="flex justify-end space-x-4">
          <button className="mr-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Post
          </button>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(TipTap), { ssr: false });