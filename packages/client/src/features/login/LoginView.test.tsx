import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LoginView from './LoginView';

describe('LoginView', () => {
  test('renders welcome message and form fields', () => {
    const onLogin = vi.fn();
    render(<LoginView onLogin={onLogin} />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('calls onLogin when form is submitted', () => {
    const onLogin = vi.fn();
    render(<LoginView onLogin={onLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'doc@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });
});
