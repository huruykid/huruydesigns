import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BelesMatchDemo from './BelesMatchDemo';
import JustFriendsToggle from './JustFriendsToggle';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Beles Interactive Components', () => {
  it('BelesMatchDemo: handles "Say Kemey" and "Keep Swiping"', () => {
    render(<BelesMatchDemo />);
    
    // Initial state
    expect(screen.getByText(/It's a match!/i)).toBeInTheDocument();
    
    // Click Say Kemey
    const sayKemeyBtn = screen.getByText(/Say Kemey/i);
    fireEvent.click(sayKemeyBtn);
    
    // Success state
    expect(screen.getByText(/Kemey sent!/i)).toBeInTheDocument();
    
    // Click Keep Swiping
    const keepSwipingBtn = screen.getByText(/Keep Swiping/i);
    fireEvent.click(keepSwipingBtn);
    
    // Back to match state
    expect(screen.getByText(/It's a match!/i)).toBeInTheDocument();
  });

  it('JustFriendsToggle: switches between Dating and Friends modes', () => {
    render(<JustFriendsToggle />);
    
    // Initial state (Dating)
    expect(screen.getByText(/Makda, 28/i)).toBeInTheDocument();
    
    // Switch to Just Friends
    const friendsBtn = screen.getByText(/Just Friends/i);
    fireEvent.click(friendsBtn);
    
    // Friends state
    expect(screen.getByText(/Yohannes, 24/i)).toBeInTheDocument();
    
    // Switch back to Dating
    const datingBtn = screen.getByText(/Dating/i);
    fireEvent.click(datingBtn);
    
    // Dating state again
    expect(screen.getByText(/Makda, 28/i)).toBeInTheDocument();
  });
});

import BelesCaseStudy from './BelesCaseStudy';
import { projects } from '../../lib/projects';

describe('BelesCaseStudy Component', () => {
  it('renders without crashing', () => {
    const belesProject = projects.find(p => p.id === 'beles');
    expect(belesProject).toBeDefined();
    
    const getSlotImage = (slot: string) => '/test-image.png';
    
    render(<BelesCaseStudy project={belesProject!} getSlotImage={getSlotImage} />);
    
    expect(screen.getByText(/The Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Existing Solutions Fall Short/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 1: Empathize & Define/i)).toBeInTheDocument();
  });
});
