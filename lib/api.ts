export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  // Fetch all posts
  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  // Fetch a single post
  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  // Create a new post
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  },

  // Update a post
  async updatePost(data: UpdatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  },

  // Delete a post
  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  },
};