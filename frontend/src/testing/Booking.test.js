import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Booking from './Booking';

describe('Booking Component', () => {
  test('renders booking information correctly', () => {
    const tour = {
      price: 100,
      reviews: [],
      title: 'Sample Tour',
    };
    const avgRating = 0;

    render(<Booking tour={tour} avgRating={avgRating} />);

    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('0 (0)')).toBeInTheDocument();
  });

  test('displays total amount correctly based on input', () => {
    const tour = {
      price: 150,
      reviews: [],
      title: 'Sample Tour',
    };
    const avgRating = 0;

    render(<Booking tour={tour} avgRating={avgRating} />);

    const guestInput = screen.getByPlaceholderText('Guest');
    fireEvent.change(guestInput, { target: { value: '3' } });

    const totalAmount = screen.getByText('$160'); // Assuming serviceFee is 10

    expect(totalAmount).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const tour = {
      price: 200,
      reviews: [],
      title: 'Sample Tour',
    };
    const avgRating = 0;

    const mockNavigate = jest.fn();
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
    };
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(<Booking tour={tour} avgRating={avgRating} />, {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ user: mockUser }}>{children}</AuthContext.Provider>
      ),
    });

    const fullNameInput = screen.getByPlaceholderText('Full Name');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const bookAtInput = screen.getByPlaceholderText('yyyy-mm-dd');
    const guestInput = screen.getByPlaceholderText('Guest');
    const bookNowButton = screen.getByText('Book Now');

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(bookAtInput, { target: { value: '2023-08-15' } });
    fireEvent.change(guestInput, { target: { value: '2' } });

    fireEvent.click(bookNowButton);

    // Ensure fetch and navigation are mocked properly in the handleClick function
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/thank-you');
    });
  });
});
