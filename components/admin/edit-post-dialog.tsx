'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api, type Post } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from './rich-text-editor';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  body: z.string().min(1, 'Content is required'),
});

interface EditPostDialogProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPostDialog({ post, open, onOpenChange }: EditPostDialogProps) {
  const [content, setContent] = useState(post.body);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        body: post.body,
      });
      setContent(post.body);
    }
  }, [post, form]);

  const updatePostMutation = useMutation({
    mutationFn: api.updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', post.id] });
      toast.success('Post updated successfully!');
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update post. Please try again.');
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updatePostMutation.mutate({
      id: post.id,
      title: values.title,
      body: content || values.body,
      userId: post.userId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Post</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title..." 
                      className="text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={content}
                      onChange={(newContent) => {
                        setContent(newContent);
                        field.onChange(newContent);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updatePostMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updatePostMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updatePostMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}