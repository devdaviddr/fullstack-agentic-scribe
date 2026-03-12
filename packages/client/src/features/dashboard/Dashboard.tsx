import { useEffect } from 'react';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
  // data fetching removed; dashboard currently empty
  useEffect(() => {
    // placeholder effect if needed later
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="w-full px-6">
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient selection</h1>
                <p className="text-sm text-gray-600">Choose a record to view or edit</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  All Patients
                </button>
                <button className="px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-300 text-sm font-medium">
                  Recent
                </button>
                <button className="px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-300 text-sm font-medium">
                  Scheduled Today
                </button>
                <button className="px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-300 text-sm font-medium">
                  Follow-ups
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, or condition..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <span>Filters</span>
                </button>
                <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add new patient
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {id:1,name:'Sarah Jenkins',pid:'#PT-88219', badge:'SCHEDULED', last:'Oct 12, 2023', concern:'Hypertension Management', next:'Today, 2:30 PM'},
                {id:2,name:'Alice Johnson',pid:'#PT-88220', badge:'SCHEDULED', last:'Sep 30, 2023', concern:'Diabetes follow-up', next:'Today, 3:00 PM'},
                {id:3,name:'Bob Smith',pid:'#PT-88221', badge:'PENDING', last:'Aug 22, 2023', concern:'Knee pain', next:'Today, 4:15 PM'},
                // add more sample patients as needed
              ].map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between min-h-[220px] border border-transparent hover:border-blue-200 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-lg text-gray-900">{p.name}</h2>
                          <p className="text-xs text-gray-500">ID: {p.pid}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {p.badge}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-gray-100 rounded p-2">
                        <p className="text-xs text-gray-500 uppercase">Last visit</p>
                        <p className="text-sm font-medium text-gray-900">{p.last}</p>
                      </div>
                      <div className="bg-gray-100 rounded p-2">
                        <p className="text-xs text-gray-500 uppercase">Primary concern</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {p.concern}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Next Appointment: {p.next}</p>
                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                      Start Scribe <span className="ml-1">&rarr;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
