import { useState } from 'react';

type NoteTab = 'SOAP Note' | 'Patient Instructions';

interface Props {
  onBack: () => void;
}

// Static waveform bar heights to avoid non-deterministic rendering
const WAVEFORM_HEIGHTS = [
  30, 45, 60, 40, 70, 50, 65, 35, 55, 45, 75, 40, 30, 55, 80, 45, 60, 38, 42, 68, 50, 55, 42, 38,
  62, 48, 72, 38, 45, 60, 48, 55, 42, 36, 65, 48, 58, 42, 36, 55, 48, 65, 36, 60, 48, 44, 55, 38,
  65, 48, 42, 60, 36, 55, 42, 48, 68, 36, 48, 62,
];

const TRANSCRIPT_ITEMS = [
  {
    speaker: 'Dr. Mitchell',
    time: '00:05',
    initials: 'DR',
    colorClass: 'bg-blue-100 text-blue-700',
    text: "Good morning, John. I see from your file that you've been having some trouble with a cough. Can you tell me more about that?",
  },
  {
    speaker: 'John Doe',
    time: '00:12',
    initials: 'PT',
    colorClass: 'bg-gray-100 text-gray-700',
    text: "Yeah, it started about two weeks ago. It's just this persistent dry cough. It gets worse at night when I'm trying to sleep.",
  },
  {
    speaker: 'Dr. Mitchell',
    time: '00:28',
    initials: 'DR',
    colorClass: 'bg-blue-100 text-blue-700',
    text: 'I understand. Have you noticed any shortness of breath or chest pain along with it?',
  },
  {
    speaker: 'John Doe',
    time: '00:35',
    initials: 'PT',
    colorClass: 'bg-gray-100 text-gray-700',
    text: 'No pain really, but definitely some tightness in my chest. And I feel a bit winded just walking up the stairs.',
  },
  {
    speaker: 'Dr. Mitchell',
    time: '00:45',
    initials: 'DR',
    colorClass: 'bg-blue-100 text-blue-700',
    text: "Ok, let's take a listen to your lungs.",
  },
];

const MEDICAL_CONCEPTS = ['Cough', 'Dyspnea', 'Chest Tightness', 'Albuterol'];

export default function ConsultationReviewView({ onBack }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<NoteTab>('SOAP Note');
  const [isPlaying, setIsPlaying] = useState(false);

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
              Consultation Review
            </h1>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
              Post-Visit Processing
            </p>
          </div>
        </div>

        {/* Patient info pill */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-xs shrink-0">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 leading-tight">John Doe</p>
            <p className="text-xs text-gray-500">45M • ID #839210</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-700 flex items-center gap-1.5 hover:bg-gray-100 px-3 py-2 rounded-lg">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zm-5 16a3 3 0 110-6 3 3 0 010 6zm3-10H5V5h10v4z" />
            </svg>
            Save Draft
          </button>
          <button className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-blue-50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Send to EMR
          </button>
          <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-gray-800">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Finalize &amp; Sign
          </button>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — recording + transcript */}
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0">
          {/* Audio player */}
          <div className="p-4 border-b border-gray-200 shrink-0">
            <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
              Consultation Recording
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              {/* Waveform */}
              <div className="flex items-end gap-px h-12 mb-3">
                {WAVEFORM_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${i < 21 ? 'bg-blue-500' : 'bg-gray-300'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shrink-0"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <span className="text-xs text-gray-700 font-mono shrink-0">05:12</span>
                <span className="text-xs text-gray-400 font-mono shrink-0">14:32</span>
                <button className="text-gray-400 hover:text-gray-600 shrink-0" aria-label="Edit recording">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Transcript header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 shrink-0">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Full Transcript
            </span>
            <button className="text-blue-600 text-sm hover:underline">Search</button>
          </div>

          {/* Transcript messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {TRANSCRIPT_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div
                  className={`w-7 h-7 rounded-full ${item.colorClass} flex items-center justify-center text-xs font-semibold shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-gray-900">{item.speaker}</span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center panel — note editor */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {/* Tab bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              {(['SOAP Note', 'Patient Instructions'] as NoteTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === tab ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>Last auto-save: Just now</span>
              <button className="hover:text-gray-600" aria-label="Undo">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
                </svg>
              </button>
              <button className="hover:text-gray-600" aria-label="Redo">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 017.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
                </svg>
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button className="hover:text-gray-600" aria-label="Print">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Note content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl mx-auto shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Clinical Encounter Note</h2>
                  <p className="text-blue-600 text-sm mt-1">Date of Service: Oct 24, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Cardiology Department</p>
                  <p className="text-sm text-gray-500">Provider: Dr. Sarah Mitchell</p>
                </div>
              </div>

              <hr className="border-gray-100 mb-6" />

              {/* SUBJECTIVE */}
              <section className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Subjective
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Chief Complaint:</strong> Persistent dry cough and chest tightness.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>History of Present Illness:</strong> 45-year-old male presents with a
                  2-week history of persistent dry cough, which worsens at night (nocturnal cough).
                  Patient reports associated chest tightness and dyspnea on exertion, specifically
                  when climbing stairs. Denies chest pain, fever, chills, or recent travel.
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Review of Systems:</strong>
                </p>
                <p className="text-sm text-gray-700">- Constitutional: Negative for fever, fatigue.</p>
                <p className="text-sm text-gray-700">
                  - Respiratory: Positive for cough, shortness of breath. Negative for wheezing.
                </p>
                <p className="text-sm text-gray-700">
                  - Cardiovascular: Negative for chest pain, palpitations.
                </p>
              </section>

              <hr className="border-gray-100 mb-6" />

              {/* OBJECTIVE */}
              <section className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Objective
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Vitals:</strong> BP 130/85, HR 78, RR 18, Temp 98.6°F, SpO2 97% on RA.
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Physical Exam:</strong>
                </p>
                <p className="text-sm text-gray-700">
                  - General: Alert, oriented x3, no acute distress.
                </p>
                <p className="text-sm text-gray-700">
                  - HEENT: Normocephalic, atraumatic. Pharynx non-erythematous.
                </p>
                <p className="text-sm text-gray-700">
                  - Lungs: Clear to auscultation bilaterally, no wheezes or rales.
                </p>
                <p className="text-sm text-gray-700">
                  - Cardiovascular: Regular rate and rhythm. No murmurs.
                </p>
              </section>

              <hr className="border-gray-100 mb-6" />

              {/* ASSESSMENT */}
              <section className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Assessment
                </h3>
                <p className="text-sm text-gray-700">1. Acute Bronchitis (J20.9)</p>
                <p className="text-sm text-gray-700">2. Hypertension (I10) - Stable</p>
              </section>

              <hr className="border-gray-100 mb-6" />

              {/* PLAN */}
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Plan
                </h3>
                <p className="text-sm text-gray-700">
                  - Prescribe Albuterol HFA 90mcg Inhaler, 2 puffs q4h prn wheezing/SOB.
                </p>
                <p className="text-sm text-gray-700">- Supportive care: hydration, rest.</p>
                <p className="text-sm text-gray-700">
                  - Follow up if symptoms worsen or persist &gt; 1 week.
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Right panel — AI Assistant */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-3 border-b border-gray-200 shrink-0">
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
              AI Assistant
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Reviewing note for quality &amp; accuracy.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Potential Omission */}
            <div className="border border-orange-200 bg-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                  Potential Omission
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                The patient mentioned feeling &ldquo;winded just walking up the stairs.&rdquo;
                Consider adding <strong>Dyspnea on Exertion</strong> to the HPI explicitly if not
                already present.
              </p>
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-300 text-gray-700 text-xs py-1.5 px-3 rounded-lg hover:bg-gray-50">
                  Dismiss
                </button>
                <button className="flex-1 bg-orange-500 text-white text-xs py-1.5 px-3 rounded-lg hover:bg-orange-600">
                  Add to Note
                </button>
              </div>
            </div>

            {/* Coding Suggestion */}
            <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500 shrink-0">
                  <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-4 10h-3v3a1 1 0 01-2 0v-3h-3a1 1 0 010-2h3V8a1 1 0 012 0v3h3a1 1 0 010 2z" />
                </svg>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Coding Suggestion
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Based on &ldquo;Acute Bronchitis&rdquo;, ICD-10 code <strong>J20.9</strong> is
                suggested.
              </p>
              <div className="flex justify-center">
                <button className="border border-gray-300 text-gray-500 text-xs py-1.5 px-6 rounded-lg hover:bg-gray-50 cursor-default">
                  Applied
                </button>
              </div>
            </div>

            {/* Tone Check */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Tone Check
                </span>
              </div>
              <p className="text-sm text-gray-700">
                The note tone is consistent and professional. No jargon flagged.
              </p>
            </div>

            {/* Detected Medical Concepts */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Detected Medical Concepts
              </p>
              <div className="flex flex-wrap gap-2">
                {MEDICAL_CONCEPTS.map((concept) => (
                  <span
                    key={concept}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 shrink-0">
            <button className="w-full border border-gray-300 text-gray-700 text-sm py-2.5 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
              Regenerate Note
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
