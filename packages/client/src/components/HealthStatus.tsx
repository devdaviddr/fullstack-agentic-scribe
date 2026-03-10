import type { HealthResponse } from '@shared/index';

interface Props {
  health: HealthResponse | null;
  loading: boolean;
  error: string | null;
}

/**
 * Displays the current API and database health status.
 */
export default function HealthStatus({ health, loading, error }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">API Health</h2>

      {loading && <p className="text-gray-500">Loading…</p>}

      {error && <p className="text-red-500">{error}</p>}

      {health && (
        <dl className="space-y-2">
          <div className="flex gap-2 text-sm">
            <dt className="font-medium text-gray-600">Status:</dt>
            <dd className="text-green-600">{health.status}</dd>
          </div>
          <div className="flex gap-2 text-sm">
            <dt className="font-medium text-gray-600">Database:</dt>
            <dd className="text-green-600">{health.database}</dd>
          </div>
          <div className="flex gap-2 text-sm">
            <dt className="font-medium text-gray-600">Timestamp:</dt>
            <dd className="text-gray-700">{health.timestamp}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
