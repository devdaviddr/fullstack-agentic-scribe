import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import type { User } from '@shared/index';
import { vi, describe, test, beforeEach, afterEach } from 'vitest';

const realFetch = global.fetch;

describe('App data fetching', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    global.fetch = realFetch;
  });

  test('login screen appears then dashboard loads data', async () => {
    const users: { users: User[] } = { users: [{ id: '1', email: 'a@a.com', name: null }] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => users });

    window.history.pushState({}, '', '/login');
    render(<App />);

    // login view should show first
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'doc@a.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await screen.findByRole('heading', { name: /scribei/i });
  });

  test('shows error on fetch failure', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockRejectedValue(new Error('network'));
    window.history.pushState({}, '', '/login');
    render(<App />);
    // still on login view first
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'doc@a.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    const errors = await screen.findAllByText(/network/i);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });
});
