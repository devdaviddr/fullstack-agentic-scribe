import { render, screen } from '@testing-library/react';
import UserList from './UserList';

describe('UserList component', () => {
  const users = [
    { id: '1', email: 'a@example.com', name: 'Alice' },
    { id: '2', email: 'b@example.com', name: null },
  ];

  test('shows loading indicator', () => {
    render(<UserList users={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<UserList users={[]} loading={false} error="failure" />);
    expect(screen.getByText('failure')).toBeInTheDocument();
  });

  test('shows "no users" when empty', () => {
    render(<UserList users={[]} loading={false} error={null} />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  test('displays a list of users', () => {
    render(<UserList users={users} loading={false} error={null} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
    expect(screen.getByText('a@example.com')).toBeInTheDocument();
  });
});
