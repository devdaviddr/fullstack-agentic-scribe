import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@shared/index';
import UserList from '../../components/UserList';

/**
 * Dashboard page displays API health and list of users.
 */
export const FAKE_USERS: User[] = [
  { id: 'PT-12345', email: 'j.smith@example.com', name: 'John Smith' },
  { id: 'PT-67890', email: 'a.jones@example.com', name: 'Alice Jones' },
];

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch('/api/users');
        if (!usersRes.ok) {
          throw new Error('API request failed');
        }
        const usersData: { users: User[] } = await usersRes.json();
        setUsers(usersData.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if API returned nothing or failed, fall back to fake data after load
  useEffect(() => {
    if (!loading && users.length === 0) {
      setUsers(FAKE_USERS);
    }
  }, [loading, users.length]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* header (shared look with live view) */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4.5L15.5 5.9a2 2 0 012.8 0l.7.7a2 2 0 010 2.8L7.5 20.9H4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 7l3 3" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">ScribeAI</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg" aria-label="Add new patient">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New Patient
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — compact nav menu for dashboard */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0">
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-800">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12h18M3 6h18M3 18h18" /></svg>
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/live-consultation')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14l9-7z" /></svg>
                  Live Consultation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/consultation-review')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M5 6h14M5 18h14" /></svg>
                  Consultation Review
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2l3 7h7l-6 4 2 8-6-5-6 5 2-8-6-4h7z" /></svg>
                  Patients
                </button>
              </li>
              <li>
                <button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 8v4l3 3" /></svg>
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Center panel — dashboard content */}
        <main className="flex-1 overflow-y-auto">
          {/* error banner (visible in center for dashboard) */}
          {error && (
            <div className="mt-4 px-8 text-red-600">Error: {error}</div>
          )}

          {/* search + filters row */}
          <div className="mt-6 px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-3 flex-wrap">
              {['All Patients', 'Recent', 'Scheduled Today', 'Follow-ups'].map((label, i) => (
                <button key={label} className={`text-xs px-3 py-1 rounded-full border ${i === 0 ? 'bg-blue-50 border-blue-100 text-blue-700' : 'border-gray-200 text-gray-700'} `}>{label}</button>
              ))}
            </div>

            <div className="flex w-full md:w-auto gap-3 items-center">
              <div className="flex-1">
                <input type="text" placeholder="Search by name, ID, or condition..." className="w-full border border-gray-200 bg-white rounded-full px-4 py-3 text-sm shadow-sm" />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm bg-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" /></svg>
                Filters
              </button>
            </div>
          </div>

          {/* patient cards */}
          <div className="mt-6 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 items-stretch">
            {users.map((user, idx) => {
              const name = user.name ?? 'Anonymous';
              const shortId = user.id ? user.id.slice(0, 8) : 'N/A';
              const statuses = ['SCHEDULED', 'INACTIVE', 'FOLLOW-UP', 'SCHEDULED'];
              const status = statuses[idx % statuses.length];

              return (
                <div key={user.id} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-[180px] flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-semibold">{(name.match(/\b\w/g) || []).slice(0,2).join('')}</div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: #{shortId}</p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${status === 'SCHEDULED' ? 'bg-green-50 text-green-700' : status === 'FOLLOW-UP' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{status}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">Last visit</p>
                      <p className="text-sm text-gray-900 mt-1">Oct 12, 2023</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">Primary concern</p>
                      <p className="text-sm text-gray-900 mt-1 truncate">Example condition</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">Next Appointment: Today, 2:30 PM</div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => navigate('/live-consultation')} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow"><svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 5v14l9-7z" /></svg>Start Scribe</button>
                      <button className="text-sm text-blue-600">View History</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Right panel removed for dashboard to keep layout compact */}
      </div>
    </div>
  );
}
