# Dashboard Application

A modern dashboard application built with Next.js 15, React 19, and TypeScript for managing posts using the JSONPlaceholder API.

## Features

### Public Site
- **Homepage** (`/`) - Beautiful grid layout displaying all posts with excerpts
- **Post Detail Pages** (`/posts/[id]`) - Full post content with elegant typography
- **Responsive Design** - Optimized for all screen sizes

### Admin Dashboard
- **Dashboard** (`/admin`) - Complete admin interface with sidebar navigation
- **CRUD Operations**:
  - ✅ Create new posts with rich text editor
  - 📖 View all posts in organized table
  - ✏️ Edit existing posts with pre-filled forms
  - 🗑️ Delete posts with confirmation dialogs
- **Rich Text Editor** - TipTap-powered editor with formatting toolbar
- **Statistics Cards** - Overview of posts and user metrics

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19
- **Styling**: TailwindCSS + shadcn/ui components
- **Data Fetching**: TanStack Query (React Query)
- **Rich Text Editor**: TipTap
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── posts/[id]/        # Dynamic post detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── posts/            # Post-related components
│   ├── providers/        # Context providers
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and API
│   ├── api.ts           # API functions
│   └── utils.ts         # Helper utilities
└── README.md
```

## Key Features

### Admin Dashboard (`/admin`)
- **Sidebar Navigation**: Clean admin interface with navigation
- **Statistics Overview**: Dashboard cards showing post metrics
- **Posts Management Table**: View all posts with actions
- **Create Post Dialog**: Modal with rich text editor
- **Edit Post Dialog**: Pre-filled form for editing
- **Delete Confirmation**: Safe deletion with confirmation

### Public Site (`/`)
- **Post Grid**: Responsive card layout
- **Post Previews**: Title, excerpt, and metadata
- **Post Detail Pages**: Full content with beautiful typography
- **Navigation**: Smooth transitions between pages

### Rich Text Editor
- **Formatting Toolbar**: Bold, italic, headings, lists, quotes
- **WYSIWYG Editing**: Real-time preview
- **HTML Output**: Clean HTML generation

## API Integration

The app integrates with JSONPlaceholder API:
- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update existing post
- `DELETE /posts/:id` - Delete post

## Build & Deploy

### Build for production:
```bash
npm run build
```

### Deploy to Vercel:
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Design Features

- **Modern UI**: Clean, professional design with attention to detail
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Color System**: Consistent color palette throughout
- **Typography**: Readable fonts and proper hierarchy

## Performance Optimizations

- **React Query Caching**: Efficient data caching and invalidation
- **Next.js App Router**: Server-side rendering and optimizations
- **Component Organization**: Modular, reusable components
- **Bundle Optimization**: Tree-shaking and code splitting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## License

MIT License - see LICENSE file for details