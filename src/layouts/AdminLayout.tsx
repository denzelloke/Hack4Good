import { useAuth } from "../db/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session || !isAdmin) {
    // Redirect anon users or normal users trying to access admin routes
    return <Navigate to={session ? "/" : "/login"} replace />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}
