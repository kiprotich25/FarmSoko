// src/pages/UserProfile.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';
import API from '../services/api';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../services/api');
window.HTMLElement.prototype.scrollIntoView = function () {};


describe('UserProfile Page', () => {
  const mockUser = { username: 'john_doe', email: 'john@example.com' };
  const mockProducts = [
    { _id: '1', name: 'Apples', category: 'Fruits' },
    { _id: '2', name: 'Beans', category: 'Legumes' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user and products', async () => {
    API.get
      .mockResolvedValueOnce({ data: { user: mockUser } }) // /auth/me
      .mockResolvedValueOnce({ data: mockProducts });      // /products/my

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading profile...')).toBeInTheDocument();

    // Wait for user data and products to load
    await waitFor(() => {
      expect(screen.getByText('john_doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Apples')).toBeInTheDocument();
      expect(screen.getByText('Beans')).toBeInTheDocument();
    });
  });

  it('deletes a product', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true); // simulate confirm

    API.get
      .mockResolvedValueOnce({ data: { user: mockUser } })  // /auth/me
      .mockResolvedValueOnce({ data: mockProducts });       // /products/my

    API.delete.mockResolvedValueOnce({}); // simulate delete call

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Apples')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(API.delete).toHaveBeenCalledWith('/products/1');
    });
  });

  it('clicks edit and shows form', async () => {
    API.get
      .mockResolvedValueOnce({ data: { user: mockUser } })  // /auth/me
      .mockResolvedValueOnce({ data: mockProducts });       // /products/my

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Apples')).toBeInTheDocument();
    });

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText('Edit Product')).toBeInTheDocument();
    });
  });
});
