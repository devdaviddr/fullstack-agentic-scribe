import { render, screen } from '@testing-library/react';
import HealthStatus from './HealthStatus';
import type { HealthResponse } from '@shared/index';

describe('HealthStatus component', () => {
  const sample: HealthResponse = {
    status: 'ok',
    database: 'connected',
    timestamp: '2026-03-11T12:00:00Z',
  };

  test('shows loading message', () => {
    render(<HealthStatus health={null} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error message when provided', () => {
    render(<HealthStatus health={null} loading={false} error="oops" />);
    expect(screen.getByText('oops')).toBeInTheDocument();
  });

  test('renders health details when available', () => {
    render(<HealthStatus health={sample} loading={false} error={null} />);
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(sample.status)).toBeInTheDocument();
    expect(screen.getByText(sample.database)).toBeInTheDocument();
    expect(screen.getByText(sample.timestamp)).toBeInTheDocument();
  });
});
