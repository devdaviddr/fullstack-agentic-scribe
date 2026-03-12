import { useState, useEffect } from 'react';
import type { User, HealthResponse } from '@shared/index';
import HealthStatus from '../../components/HealthStatus';
import UserList from '../../components/UserList';

export default function Dashboard() {
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

        const [healthData, usersData]: [HealthResponse, { users: User[] }] = await Promise.all([
          healthRes.json(),
          usersRes.json(),
        ]);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Fullstack Agentic Scribe</h1>
        <HealthStatus health={health} loading={loading} error={error} />
        <UserList users={users} loading={loading} error={error} />
      </div>
    </div>
  );
}
