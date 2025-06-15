
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

const AdminPage = () => {
  const { user, profile, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show login if not authenticated or not an admin
  if (!user || !profile || profile.user_type !== 'admin') {
    return <AdminLogin />;
  }

  // Show dashboard for authenticated admin
  return <AdminDashboard />;
};

export default AdminPage;
