// src/components/__tests__/Create.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Create from '../Create';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Create component', () => {
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    useDispatch.mockReturnValue(dispatchSpy);
  });

  test('renders initial Create button', () => {
    render(<Create />);
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
  });

  test('shows form when Create button is clicked', () => {
    render(<Create />);
    fireEvent.click(screen.getByText(/Create/i));
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
  });

  /*
  test('form submission dispatches createSongRequest action', () => {
    render(<Create />);
    fireEvent.click(screen.getByText(/Create/i));

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: 'My Test Song' },
    });

    fireEvent.change(screen.getByLabelText(/Artist:/i), {
      target: { value: 'Test Artist' },
    });

    fireEvent.change(screen.getByLabelText(/Year:/i), {
      target: { value: '2023' },
    });

    // Simulate file input with dummy File object
    const dummyImage = new File(['image'], 'album.jpg', { type: 'image/jpeg' });
    const dummyAudio = new File(['audio'], 'song.mp3', { type: 'audio/mpeg' });

    fireEvent.change(screen.getByLabelText(/Album/i), {
      target: { files: [dummyImage] },
    });

    fireEvent.change(screen.getByLabelText(/Song/i), {
      target: { files: [dummyAudio] },
    });

    // Submit form
    fireEvent.click(screen.getByText(/Submit/i));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });
  */

  test('cancel button hides the form', () => {
    render(<Create />);
    fireEvent.click(screen.getByText(/Create/i));
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByLabelText(/Title:/i)).not.toBeInTheDocument();
  });
});
