'use client';

import { useQuery } from '@tanstack/react-query';
import { User, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  website: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// API functions
const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

// Loading components
function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 mb-6 rounded"></div>
      <div className="space-y-3">
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
      </div>
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
          <div className="bg-gray-200 h-3 w-full rounded mb-1"></div>
          <div className="bg-gray-200 h-3 w-3/4 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function PostDetailClient({ id }: { id: number }) {
  // Fetch post data
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Fetch user data (dependent on post data)
  const {
    data: user,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUser(post!.userId),
    enabled: !!post?.userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Fetch comments
  const {
    data: comments,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchComments(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (postLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Error Loading Post</h2>
          <p className="text-red-600 mb-4">
            {postError instanceof Error ? postError.message : 'Something went wrong'}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Post Not Found</h2>
          <p className="text-yellow-600 mb-4">The requested post could not be found.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Post Content */}
      <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-600">
            {userLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              </div>
            ) : user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-blue-600">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>@{user.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{user.email}</span>
                </div>
              </>
            ) : null}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.body}
          </p>
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-8">
          <MessageCircle className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Comments
            {comments && (
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({comments.length})
              </span>
            )}
          </h2>
        </div>

        {commentsLoading ? (
          <CommentsSkeleton />
        ) : comments && comments.length > 0 ? (
          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{comment.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {comment.email}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}