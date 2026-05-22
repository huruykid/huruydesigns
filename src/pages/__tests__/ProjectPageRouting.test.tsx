import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectPage from '../ProjectPage';
import React from 'react';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ data: [] }),
  },
}));

// Mock SEO to avoid errors
vi.mock('@/components/SEO', () => ({
  default: () => null,
}));

// Mock Layout to avoid errors
vi.mock('@/components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ProjectPage Routing', () => {
  it('handles hyphenated project IDs', () => {
    render(
      <MemoryRouter initialEntries={['/project/ebt-finder']}>
        <Routes>
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );
    
    // Check if EBT Finder is rendered instead of redirecting to Home
    expect(screen.queryByText('Home')).toBeNull();
    // Use findByText because of useEffects
    // expect(await screen.findByText('EBT Finder')).toBeDefined();
    // Actually render should be enough if it's synchronous for the first pass
    expect(screen.getByText('EBT Finder')).toBeDefined();
  });
});
