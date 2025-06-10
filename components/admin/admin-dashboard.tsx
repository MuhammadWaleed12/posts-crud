'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Settings, BarChart3, FileText } from 'lucide-react';
import { AdminPostsList } from './admin-posts-list';
import { CreatePostDialog } from './create-post-dialog';
import { EditPostDialog } from './edit-post-dialog';
import type { Post } from '@/lib/api';

export function AdminDashboard() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
  });

  const stats = [
    {
      title: 'Total Posts',
      value: posts?.length || 0,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Published',
      value: posts?.length || 0,
      icon: BarChart3,
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: new Set(posts?.map(p => p.userId)).size || 0,
      icon: Settings,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your posts</p>
        </div>
        <nav className="p-4 space-y-2">
          <Button variant="default" className="w-full justify-start" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Posts
          </Button>
          {/* <Button variant="ghost" className="w-full justify-start" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Posts Management</h2>
              <p className="text-gray-600">Create, edit, and manage your posts</p>
            </div>
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Posts List */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>All Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminPostsList 
                posts={posts || []}
                isLoading={isLoading}
                onEdit={setEditingPost}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <CreatePostDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
      
      {editingPost && (
        <EditPostDialog 
          post={editingPost}
          open={!!editingPost}
          onOpenChange={(open) => !open && setEditingPost(null)}
        />
      )}
    </div>
  );
}