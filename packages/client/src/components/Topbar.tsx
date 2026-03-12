import Logo from './Logo';
import {
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow px-4 py-2 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search…"
            className="pl-8 pr-3 py-1 border rounded bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button aria-label="Notifications">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </button>
        <button aria-label="Settings">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </button>
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
      </div>
    </header>
  );
}
