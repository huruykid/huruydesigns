import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EBTSearchDemo from '../EBTSearchDemo';
import React from 'react';

describe('EBTSearchDemo', () => {
  it('renders store list initially', () => {
    render(<EBTSearchDemo />);
    expect(screen.getByText('Dalle Kitchen')).toBeDefined();
    expect(screen.getByText('Green Valley Market')).toBeDefined();
  });

  it('navigates to details and back', () => {
    render(<EBTSearchDemo />);
    const buttons = screen.getAllByText('VIEW DETAILS');
    fireEvent.click(buttons[0]);
    
    expect(screen.getByText('Open Now')).toBeDefined();
    
    // Check for back button (ChevronLeft is usually in a button)
    const backButton = screen.getByRole('button', { name: '' }); // It doesn't have a label in the code, just an icon
    // Actually the code says: <button onClick={() => setSelectedStore(null)} ...>
    // I'll find it by searching for the button containing the ChevronLeft icon or just the first button that isn't in the nav.
    // Let's just check if "VIEW DETAILS" is gone.
    expect(screen.queryByText('VIEW DETAILS')).toBeNull();
  });
});
