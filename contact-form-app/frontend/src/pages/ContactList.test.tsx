import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ContactList from './ContactList';

// Mock fetch API
const mockContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Test message from John',
    attachment: null,
    created_at: '2023-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Another test message',
    attachment: {
      original_filename: 'test.pdf',
      size: 1024
    },
    created_at: '2023-01-02T11:00:00Z'
  }
];

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ContactList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<ContactList />);
    
    expect(screen.getByText('Loading contacts...')).toBeInTheDocument();
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument(); // Check for spinner class
  });

  it('renders contact management header', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContacts
    });

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('Contact Management')).toBeInTheDocument();
      expect(screen.getByText('2 contacts')).toBeInTheDocument();
    });
  });

  it('renders search input', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContacts
    });

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Search contacts/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search contacts...')).toBeInTheDocument();
    });
  });

  it('displays attachment information when present', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockContacts
    });

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
      expect(screen.getByText('1 KB')).toBeInTheDocument();
    });
  });

  it('shows empty state when no contacts', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('No contacts yet')).toBeInTheDocument();
      expect(screen.getByText('Be the first to submit a contact form!')).toBeInTheDocument();
    });
  });

  it('displays error state when API fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument(); // Shows the actual error message
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });
});
