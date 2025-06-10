import { Suspense } from 'react';
import { PostsList } from '@/components/posts/posts-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing stories, insights, and ideas from our community
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}