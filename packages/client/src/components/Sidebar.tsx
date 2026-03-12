import { NavLink } from 'react-router-dom';
import { UsersIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <nav className="w-56 bg-white text-gray-900 h-full border-r sticky top-0 overflow-auto">
      <ul className="mt-2 space-y-1 px-4">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <UsersIcon className="h-5 w-5" />
            Patients
          </NavLink>
        </li>
        {/* add more links here as needed */}
      </ul>
    </nav>
  );
}
