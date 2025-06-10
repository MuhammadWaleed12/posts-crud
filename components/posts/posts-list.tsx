'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export function PostsList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                {post.body}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  User {post.userId}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Post #{post.id}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}