import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../pages/Contact';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';

// Mock the components that might cause issues in JSDOM or aren't needed
vi.mock('@/components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/SEO', () => ({
  default: () => null,
}));

// Mock window.location.href
const originalLocation = window.location;
delete (window as any).location;
window.location = { ...originalLocation, href: '' } as any;

describe('Contact Page', () => {
  beforeEach(() => {
    window.location.href = '';
    vi.clearAllMocks();
  });

  it('renders the contact form', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('allows typing into fields', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </HelmetProvider>
    );

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Test User', name: 'name' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
    fireEvent.change(messageInput, { target: { value: 'Hello message', name: 'message' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(messageInput.value).toBe('Hello message');
  });

  it('submits the form and opens email client', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </HelmetProvider>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'Test User', name: 'name' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
    fireEvent.change(messageInput, { target: { value: 'Hello message', name: 'message' } });

    fireEvent.click(submitBtn);

    // Check if mailto link was triggered
    expect(window.location.href).toContain('mailto:huruydesigns@gmail.com');
    expect(window.location.href).toContain('Test%20User');
    
    // Check if form was reset
    expect((nameInput as HTMLInputElement).value).toBe('');
  });
});
