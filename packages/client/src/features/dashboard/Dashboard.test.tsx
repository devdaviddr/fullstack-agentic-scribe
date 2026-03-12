import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import type { User } from '@shared/index';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const realFetch = global.fetch;

describe('Dashboard page', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    global.fetch = realFetch;
  });

  test('displays user list and header', async () => {
    const users: { users: User[] } = { users: [{ id: '1', email: 'a@a.com', name: null }] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => users });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: /scribei/i });
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  test('navigates to live consultation when start scribe clicked', async () => {
    const users: { users: User[] } = { users: [{ id: '1', email: 'a@a.com', name: 'Alice' }] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => users });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-consultation" element={<div>LIVE PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Alice'));
    fireEvent.click(screen.getByText(/start scribe/i));
    await waitFor(() => screen.getByText('LIVE PAGE'));
  });

  test('renders error if fetch fails', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockRejectedValue(new Error('fail'));
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const errs = await screen.findAllByText(/fail/i);
    expect(errs.length).toBeGreaterThanOrEqual(1);
  });
});
