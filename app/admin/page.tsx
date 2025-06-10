import { Suspense } from 'react';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}