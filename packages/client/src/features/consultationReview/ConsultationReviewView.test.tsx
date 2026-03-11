import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ConsultationReviewView from './ConsultationReviewView';

describe('ConsultationReviewView', () => {
  const onBack = () => undefined;

  test('renders the page title', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Consultation Review')).toBeInTheDocument();
  });

  test('shows Post-Visit Processing subtitle', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Post-Visit Processing')).toBeInTheDocument();
  });

  test('displays patient info in header', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getByText('45M • ID #839210')).toBeInTheDocument();
  });

  test('renders header action buttons', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Save Draft')).toBeInTheDocument();
    expect(screen.getByText('Send to EMR')).toBeInTheDocument();
    expect(screen.getByText(/Finalize.*Sign/i)).toBeInTheDocument();
  });

  test('renders audio player controls', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Consultation Recording')).toBeInTheDocument();
    expect(screen.getByLabelText('Play')).toBeInTheDocument();
    expect(screen.getByText('05:12')).toBeInTheDocument();
    expect(screen.getByText('14:32')).toBeInTheDocument();
  });

  test('toggles play/pause on audio button click', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  test('shows Full Transcript section', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Full Transcript')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('renders transcript messages', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getAllByText('Dr. Mitchell').length).toBeGreaterThan(0);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  test('shows SOAP Note tab active by default', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    const soapBtn = screen.getByRole('button', { name: 'SOAP Note' });
    expect(soapBtn).toHaveClass('bg-gray-900');
  });

  test('renders Clinical Encounter Note', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Clinical Encounter Note')).toBeInTheDocument();
    expect(screen.getByText('Cardiology Department')).toBeInTheDocument();
    expect(screen.getByText('Date of Service: Oct 24, 2023')).toBeInTheDocument();
  });

  test('renders SOAP note sections in the note', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Subjective')).toBeInTheDocument();
    expect(screen.getByText('Objective')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
  });

  test('renders AI Assistant panel', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText(/Reviewing note for quality/i)).toBeInTheDocument();
  });

  test('shows AI suggestion cards', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Potential Omission')).toBeInTheDocument();
    expect(screen.getByText('Coding Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Tone Check')).toBeInTheDocument();
  });

  test('shows detected medical concepts', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Cough')).toBeInTheDocument();
    expect(screen.getByText('Dyspnea')).toBeInTheDocument();
    expect(screen.getByText('Chest Tightness')).toBeInTheDocument();
    expect(screen.getByText('Albuterol')).toBeInTheDocument();
  });

  test('calls onBack when back button is clicked', () => {
    const mockOnBack = vi.fn();
    render(<ConsultationReviewView onBack={mockOnBack} />);
    fireEvent.click(screen.getByLabelText('Back to dashboard'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('renders Regenerate Note button', () => {
    render(<ConsultationReviewView onBack={onBack} />);
    expect(screen.getByText('Regenerate Note')).toBeInTheDocument();
  });
});
