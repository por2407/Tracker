import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import Sidebar from './Sidebar';

/**
 * Protected layout — redirects to /login if not authenticated.
 * Renders Sidebar + Navbar + page content (via <Outlet />).
 */
export default function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
