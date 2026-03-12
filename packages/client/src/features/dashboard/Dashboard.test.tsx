import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

// we don't need any providers since Dashboard is self-contained

describe('Dashboard view', () => {
  test('renders header, search, and category buttons', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: /patient selection/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();

    // category pills
    expect(screen.getByRole('button', { name: /all patients/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /scheduled today/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /follow-ups/i })).toBeInTheDocument();
  });

  test('shows all patient cards initially', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    // there are three mocked entries
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  test('filters by search term', async () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search by name/i);

    await user.type(input, 'Alice');
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Jenkins')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });

  test('category buttons apply simple filters', async () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    const user = userEvent.setup();

    // follow-ups filter selects those whose concern contains 'follow'
    const followBtn = screen.getByRole('button', { name: /follow-ups/i });
    await user.click(followBtn);
    // only Alice Johnson has 'follow-up' concern
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Jenkins')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });
});