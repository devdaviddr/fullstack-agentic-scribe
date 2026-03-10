import { useState, useEffect } from 'react';
import type { User, HealthResponse } from '@shared/index';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, usersRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/users'),
        ]);

        if (!healthRes.ok || !usersRes.ok) {
          throw new Error('API request failed');
        }

        const healthData: HealthResponse = await healthRes.json();
        const usersData = await usersRes.json();

        setHealth(healthData);
        setUsers(usersData.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Fullstack Agentic Scribe
        </h1>

        {/* Health Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">API Health</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : health ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{' '}
                <span className="text-green-600">{health.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Database:</span>{' '}
                <span className="text-green-600">{health.database}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Timestamp:</span> {health.timestamp}
              </p>
            </div>
          ) : null}
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
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
      </div>
    </div>
  );
}

export default App;
