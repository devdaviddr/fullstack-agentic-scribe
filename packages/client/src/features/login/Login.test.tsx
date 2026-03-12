import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { vi } from 'vitest';

// stub useNavigate so we can assert calls
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => render(<Login />, { wrapper: MemoryRouter });

describe('Login feature', () => {
  test('renders the login heading and subheading', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByText(/log in to manage your medical documentation/i)).toBeInTheDocument();
  });

  test('navigates to dashboard on successful submit', () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText(/doctor@hospital.com/i), {
      target: { value: 'a@a.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'pass' },
    });
    const button = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('contains email and password fields with placeholders', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/doctor@hospital.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/)).toBeInTheDocument();
  });

  test('has remember me checkbox and forgot password link', () => {
    renderLogin();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });

  test('login button is disabled when inputs are empty and becomes enabled after typing', () => {
    renderLogin();
    const button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/doctor@hospital.com/i), {
      target: { value: 'doctor@hospital.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'secret' },
    });

    expect(button).toBeEnabled();
  });

  test('shows google login button and create account link', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toBeInTheDocument();
  });
});
