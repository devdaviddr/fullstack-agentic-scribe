import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import type { HealthResponse, User } from '@shared/index';
import { vi, describe, test, beforeEach, afterEach } from 'vitest';

const realFetch = global.fetch;

describe('App data fetching', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    global.fetch = realFetch;
  });

  test('loads and displays health and users', async () => {
    const health: HealthResponse = { status: 'ok', database: 'connected', timestamp: 't' };
    const users: { users: User[] } = { users: [{ id: '1', email: 'a@a.com', name: null }] };
    (global.fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => health })
      .mockResolvedValueOnce({ ok: true, json: async () => users });

    render(<App />);

    await waitFor(() => expect(screen.getByText(/api health/i)).toBeInTheDocument());
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByText('a@a.com')).toBeInTheDocument();
  });

  test('shows error on fetch failure', async () => {
    (global.fetch as any).mockRejectedValue(new Error('network'));
    render(<App />);
    await waitFor(() => expect(screen.getByText(/api health/i)).toBeInTheDocument());
    const errors = screen.getAllByText(/network/i);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  test('navigates to login route', async () => {
    // push history so router starts on /login
    window.history.pushState({}, '', '/login');
    render(<App />);
    // look for the login page heading text
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /welcome back/i })
      ).toBeInTheDocument()
    );
  });
});
