import { useState, useEffect } from 'react';
import type { User, HealthResponse } from '@shared/index';
import HealthStatus from './components/HealthStatus';
import UserList from './components/UserList';
import LiveConsultationView from './features/liveConsultation';
import ConsultationReviewView from './features/consultationReview';

type AppView = 'dashboard' | 'live-consultation' | 'consultation-review';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
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

  if (currentView === 'live-consultation') {
    return <LiveConsultationView onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'consultation-review') {
    return <ConsultationReviewView onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fullstack Agentic Scribe</h1>

        {/* View navigation */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setCurrentView('live-consultation')}
            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            Live Consultation
          </button>
          <button
            onClick={() => setCurrentView('consultation-review')}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
            Consultation Review
          </button>
        </div>

        <HealthStatus health={health} loading={loading} error={error} />
        <UserList users={users} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
