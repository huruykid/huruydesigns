import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Resume from './Resume';
import { expect, test } from 'vitest';

test('Resume page renders without crashing', () => {
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Resume />
      </BrowserRouter>
    </HelmetProvider>
  );
  expect(true).toBe(true);
});
