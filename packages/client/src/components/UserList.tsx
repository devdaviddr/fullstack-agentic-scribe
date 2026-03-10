import type { User } from '@shared/index';

interface Props {
  users: User[];
  loading: boolean;
  error: string | null;
}

/**
 * Renders a list of users fetched from the API.
 */
export default function UserList({ users, loading, error }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>

      {loading && <p className="text-gray-500">Loading…</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-3">
              <p className="font-medium text-gray-900">{user.name ?? 'Anonymous'}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
