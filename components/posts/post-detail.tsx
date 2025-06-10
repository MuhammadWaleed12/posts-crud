'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { User, Calendar } from 'lucide-react';

interface PostDetailProps {
  id: number;
}

export function PostDetail({ id }: PostDetailProps) {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getPost(id),
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load post. Please try again later.</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Post not found.</p>
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="w-fit">
            Post #{post.id}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            User {post.userId}
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900 leading-tight">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          <Calendar className="h-4 w-4 mr-2" />
          Published on our platform
        </div>
      </CardContent>
    </Card>
  );
}