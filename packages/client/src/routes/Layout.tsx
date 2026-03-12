import { useNavigate, Outlet } from 'react-router-dom';

/**
 * Shared page shell used by all authenticated routes. Navigation buttons
 * live here so they appear on every child page automatically via <Outlet />.
 */
export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* layout without title or nav */}
      <Outlet />
    </div>
  );
}
