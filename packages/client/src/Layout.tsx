import { Outlet } from 'react-router-dom';

// Layout component ensures the app always takes the full viewport
// and provides a router outlet where child routes are rendered.
export default function Layout() {
  return (
    <div className="min-h-screen min-w-full flex flex-col">
      {/* You could add a persistent header/nav here */}
      <Outlet />
    </div>
  );
}
