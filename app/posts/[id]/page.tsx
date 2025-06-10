import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PostDetailClient } from './post-detail-client';

interface Props {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    
    return posts.map((post: { id: number }) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to fetch posts for static generation:', error);
    return Array.from({ length: 100 }, (_, i) => ({
      id: (i + 1).toString(),
    }));
  }
}

function PostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/2 mb-6 rounded"></div>
          <div className="space-y-3">
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PostPage({ params }: Props) {
  // Await the params promise
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Posts</span>
          </Link>
        </div>
        
        <Suspense fallback={<PostSkeleton />}>
          <PostDetailClient id={parseInt(id)} />
        </Suspense>
      </div>
    </div>
  );
}