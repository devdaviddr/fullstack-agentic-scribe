import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SOAPTab = 'SOAP' | 'Summary' | 'Orders';

interface Props {
  onBack: () => void;
}

interface TranscriptMessage {
  id: number;
  speaker: string;
  time: string;
  side: 'left' | 'right';
  text: string;
  highlights: { word: string; className: string }[];
  textSuffix: string;
}

const TRANSCRIPT_MESSAGES: TranscriptMessage[] = [
  {
    id: 1,
    speaker: 'Dr. Mitchell',
    time: '00:05',
    side: 'left',
    text: "Good morning, John. I see from your file that you've been having some trouble with a ",
    highlights: [{ word: 'cough', className: 'bg-blue-100 text-blue-800' }],
    textSuffix: '. Can you tell me more about that?',
  },
  {
    id: 2,
    speaker: 'John Doe',
    time: '00:12',
    side: 'right',
    text: "Yeah, it started about two weeks ago. It's just this persistent ",
    highlights: [{ word: 'dry cough', className: 'bg-orange-100 text-orange-800' }],
    textSuffix: ". It gets worse at night when I'm trying to sleep.",
  },
  {
    id: 3,
    speaker: 'Dr. Mitchell',
    time: '00:28',
    side: 'left',
    text: 'I understand. Have you noticed any ',
    highlights: [{ word: 'shortness of breath', className: 'bg-blue-100 text-blue-800' }],
    textSuffix: ' or chest pain along with it?',
  },
  {
    id: 4,
    speaker: 'John Doe',
    time: '00:35',
    side: 'right',
    text: 'No pain really, but definitely some tightness in my chest. And I feel a bit winded just walking up the stairs.',
    highlights: [],
    textSuffix: '',
  },
];

export default function LiveConsultationView({ onBack }: Props): JSX.Element {
  const navigate = useNavigate();
  const [activeSOAPTab, setActiveSOAPTab] = useState<SOAPTab>('SOAP');
  const [isPaused, setIsPaused] = useState(false);
  const [medHistoryOpen, setMedHistoryOpen] = useState(false);
  const [currentMedsOpen, setCurrentMedsOpen] = useState(false);
  const [allergiesOpen, setAllergiesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 mr-1 text-sm"
            aria-label="Back to dashboard"
          >
            ←
          </button>
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-tight">
              Live Consultation AI Scribe
            </h1>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              System Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="font-mono text-sm font-medium">00:14:32</span>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium hover:bg-gray-50"
          >
            {isPaused ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Resume
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                Pause
              </>
            )}
          </button>
          <button className="bg-blue-600 text-white rounded-full px-5 py-1.5 flex items-center gap-2 text-sm font-medium hover:bg-blue-700">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Finish Consultation
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Sarah Mitchell</p>
            <p className="text-xs text-gray-500">Cardiology</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-semibold text-sm shrink-0">
            SM
          </div>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — patient sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0">
          <div className="flex flex-col items-center px-4 pt-6 pb-4">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">John Doe</h2>
            <p className="text-xs text-gray-500 mt-0.5">45 Years Old | Male | ID: #839210</p>
            <div className="flex gap-2 mt-3">
              <button className="border border-gray-300 text-xs px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50">
                View EMR
              </button>
              <button className="border border-gray-300 text-xs px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50">
                History
              </button>
            </div>
          </div>

          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
              Chief Complaint
            </p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-gray-700">
              Persistent dry cough and chest tightness for the last 2 weeks.
            </div>
          </div>

          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
              History
            </p>
            {[
              {
                label: 'Medical History',
                open: medHistoryOpen,
                toggle: () => setMedHistoryOpen(!medHistoryOpen),
              },
              {
                label: 'Current Meds',
                open: currentMedsOpen,
                toggle: () => setCurrentMedsOpen(!currentMedsOpen),
              },
              {
                label: 'Allergies',
                open: allergiesOpen,
                toggle: () => setAllergiesOpen(!allergiesOpen),
              },
            ].map(({ label, open, toggle }) => (
              <div key={label} className="border border-gray-200 rounded-lg mb-2 overflow-hidden">
                <button
                  onClick={toggle}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span>{label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                {open && (
                  <div className="px-3 pb-3 text-xs text-gray-500">No data available.</div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Center panel — Live transcription */}
        <main className="flex-1 flex flex-col overflow-hidden relative bg-gray-50">
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">Live Transcription</span>
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
              </svg>
              <span>English (US)</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 pb-20">
            <div className="text-center text-xs text-gray-400">10:45 AM</div>

            {TRANSCRIPT_MESSAGES.map((msg) =>
              msg.side === 'left' ? (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600 shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{msg.speaker}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {msg.text}
                      {msg.highlights.map((h) => (
                        <span key={h.word} className={`${h.className} px-1 rounded`}>
                          {h.word}
                        </span>
                      ))}
                      {msg.textSuffix}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                    JD
                  </div>
                  <div className="flex flex-col items-end flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">{msg.time}</span>
                      <span className="text-sm font-medium text-gray-900">{msg.speaker}</span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-md shadow-sm">
                      <p className="text-sm text-gray-700">
                        {msg.text}
                        {msg.highlights.map((h) => (
                          <span key={h.word} className={`${h.className} px-1 rounded`}>
                            {h.word}
                          </span>
                        ))}
                        {msg.textSuffix}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Listening indicator */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                <div className="flex gap-0.5 items-end h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-bounce"
                      style={{ height: '60%', animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Listening...</span>
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="bg-gray-900 rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
              <button className="text-white hover:text-gray-300" aria-label="Transcript">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                </svg>
              </button>
              <div className="w-px h-5 bg-gray-600" />
              <button className="text-white hover:text-gray-300" aria-label="Edit">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
              <div className="w-px h-5 bg-gray-600" />
              <button className="text-red-400 hover:text-red-300" aria-label="Mute">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* Right panel — AI Notes */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-blue-500"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              AI Notes
            </h2>
            <button className="text-blue-600 text-xs hover:underline flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
              </svg>
              Copy to EMR
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 shrink-0">
            {(['SOAP', 'Summary', 'Orders'] as SOAPTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSOAPTab(tab)}
                className={`flex-1 py-2.5 text-xs font-semibold tracking-wide ${
                  activeSOAPTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Subjective
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 relative">
                Patient reports persistent dry cough x2 weeks, worse at night (noc). Denies chest
                pain but reports chest tightness and dyspnea on exertion (stairs).
                <button
                  className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600"
                  aria-label="Edit subjective"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Objective
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                Gen: Alert, no acute distress.
                <br />
                Resp: Lungs clear to auscultation bilaterally (pending exam).
                <br />
                CV: RRR, no murmurs.
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Assessment
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                1. Acute Bronchitis (J20.9)
                <br />
                2. Hypertension (I10) - Stable
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Plan
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                - Prescribe Albuterol HFA 90mcg Inhaler, 2 puffs q4h prn wheezing/SOB.
                <br />
                - Supportive care: hydration, rest.
                <br />- Follow up if symptoms worsen or persist &gt; 1 week.
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 shrink-0 space-y-2">
            <button className="w-full bg-gray-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Review &amp; Sign Note
            </button>
            <button
              onClick={() => navigate('/consultation-review')}
              className="w-full bg-green-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2"
            >
              Go to Review
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
