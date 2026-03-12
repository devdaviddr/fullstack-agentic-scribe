import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LiveConsultationView from './LiveConsultationView';

describe('LiveConsultationView', () => {
  const onBack = () => undefined;

  function renderWithRouter(ui: React.ReactElement) {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  }

  test('renders the page title', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Live Consultation AI Scribe')).toBeInTheDocument();
  });

  test('shows System Online status', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('System Online')).toBeInTheDocument();
  });

  test('displays the consultation timer', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('00:14:32')).toBeInTheDocument();
  });

  test('shows patient name in sidebar', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  test('renders Live Transcription panel', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Live Transcription')).toBeInTheDocument();
  });

  test('shows transcript messages', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getAllByText('Dr. Mitchell').length).toBeGreaterThan(0);
  });

  test('renders AI Notes panel with SOAP tab active by default', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('AI Notes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /SOAP/i })).toBeInTheDocument();
  });

  test('renders SOAP note sections', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Subjective')).toBeInTheDocument();
    expect(screen.getByText('Objective')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
  });

  test('toggles Pause / Resume button', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    const pauseButton = screen.getByText('Pause');
    expect(pauseButton).toBeInTheDocument();
    fireEvent.click(pauseButton);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  test('expands Medical History accordion', () => {
    renderWithRouter(<LiveConsultationView onBack={onBack} />);
    const accordionButton = screen.getByText('Medical History');
    fireEvent.click(accordionButton);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  test('calls onBack when back button is clicked', () => {
    const mockOnBack = vi.fn();
    renderWithRouter(<LiveConsultationView onBack={mockOnBack} />);
    fireEvent.click(screen.getByLabelText('Back to dashboard'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('renders Review & Sign Note and review navigation', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LiveConsultationView onBack={onBack} />} />
          <Route path="/consultation-review" element={<div>review page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Review.*Sign Note/i)).toBeInTheDocument();
    const goButton = screen.getByText(/Go to Review/i);
    expect(goButton).toBeInTheDocument();
    fireEvent.click(goButton);
    expect(screen.getByText('review page')).toBeInTheDocument();
  });
});
