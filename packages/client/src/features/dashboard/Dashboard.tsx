import { useState } from 'react';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';

export default function Dashboard() {
  // mock patient data stored in state so we can filter it
  const [patients] = useState([
    {id:1,name:'Sarah Jenkins',pid:'#PT-88219',badge:'SCHEDULED',last:'Oct 12, 2023',concern:'Hypertension Management',next:'Today, 2:30 PM'},
    {id:2,name:'Alice Johnson',pid:'#PT-88220',badge:'SCHEDULED',last:'Sep 30, 2023',concern:'Diabetes follow-up',next:'Today, 3:00 PM'},
    {id:3,name:'Bob Smith',pid:'#PT-88221',badge:'PENDING',last:'Aug 22, 2023',concern:'Knee pain',next:'Today, 4:15 PM'},
    // additional entries omitted for brevity
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<'all'|'recent'|'today'|'followups'>('all');

  // compute filtered list based on searchTerm and category
  const filtered = patients.filter((p) => {
    // search filter
    const lower = searchTerm.toLowerCase();
    if (
      lower &&
      !(
        p.name.toLowerCase().includes(lower) ||
        p.pid.toLowerCase().includes(lower) ||
        p.concern.toLowerCase().includes(lower)
      )
    ) {
      return false;
    }
    // category filter (simplified mock logic)
    switch (category) {
      case 'recent':
        return p.badge !== 'Cancelled';
      case 'today':
        return p.next.toLowerCase().includes('today');
      case 'followups':
        return p.concern.toLowerCase().includes('follow');
      default:
        return true;
    }
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="w-full px-6">
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <Heading level={1} className="text-gray-900">Patient selection</Heading>
                <Text className="text-gray-600">Choose a record to view or edit</Text>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  {key:'all',label:'All Patients'},
                  {key:'recent',label:'Recent'},
                  {key:'today',label:'Scheduled Today'},
                  {key:'followups',label:'Follow-ups'},
                ].map(({key,label}) => (
                  <Button
                    key={key}
                    size="sm"
                    variant="outline"
                    onClick={() => setCategory(key as any)}
                    className={`${
                      category === key
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-white text-gray-700 border border-gray-300'
                    } rounded-full`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <TextInput
                    id="search"
                    label="Search"
                    hideLabel
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, ID, or condition..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-1">
                  Filters
                </Button>
                <Button variant="primary" className="ml-auto">
                  Add new patient
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <Card
                  key={p.id}
                  footer={
                    <div className="mt-4 flex items-center justify-between">
                      <Text className="text-xs text-gray-500">Next Appointment: {p.next}</Text>
                      <Button variant="outline" className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                        Start Scribe <span className="ml-1">&rarr;</span>
                      </Button>
                    </div>
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCircleIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                          <Heading level={2} className="font-semibold text-lg text-gray-900">{p.name}</Heading>
                          <Text className="text-xs text-gray-500">ID: {p.pid}</Text>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {p.badge}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-gray-100 rounded p-2">
                        <Text className="text-xs text-gray-500 uppercase">Last visit</Text>
                        <Text className="text-sm font-medium text-gray-900">{p.last}</Text>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                        <Text className="text-xs text-gray-500 uppercase">Primary concern</Text>
                        <Text className="text-sm font-medium text-gray-900 truncate">
                          {p.concern}
                        </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
