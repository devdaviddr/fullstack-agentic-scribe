import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LiveConsultationView from './LiveConsultationView';

describe('LiveConsultationView', () => {
  const onBack = () => undefined;

  test('renders the page title', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Live Consultation AI Scribe')).toBeInTheDocument();
  });

  test('shows System Online status', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('System Online')).toBeInTheDocument();
  });

  test('displays the consultation timer', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('00:14:32')).toBeInTheDocument();
  });

  test('shows patient name in sidebar', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  test('renders Live Transcription panel', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Live Transcription')).toBeInTheDocument();
  });

  test('shows transcript messages', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getAllByText('Dr. Mitchell').length).toBeGreaterThan(0);
  });

  test('renders AI Notes panel with SOAP tab active by default', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('AI Notes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /SOAP/i })).toBeInTheDocument();
  });

  test('renders SOAP note sections', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText('Subjective')).toBeInTheDocument();
    expect(screen.getByText('Objective')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
  });

  test('toggles Pause / Resume button', () => {
    render(<LiveConsultationView onBack={onBack} />);
    const pauseButton = screen.getByText('Pause');
    expect(pauseButton).toBeInTheDocument();
    fireEvent.click(pauseButton);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  test('expands Medical History accordion', () => {
    render(<LiveConsultationView onBack={onBack} />);
    const accordionButton = screen.getByText('Medical History');
    fireEvent.click(accordionButton);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  test('calls onBack when back button is clicked', () => {
    const mockOnBack = vi.fn();
    render(<LiveConsultationView onBack={mockOnBack} />);
    fireEvent.click(screen.getByLabelText('Back to dashboard'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('renders Review & Sign Note button', () => {
    render(<LiveConsultationView onBack={onBack} />);
    expect(screen.getByText(/Review.*Sign Note/i)).toBeInTheDocument();
  });
});
