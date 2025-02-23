import React from 'react';
import { render, screen } from '@testing-library/react';
import Example from "./components/Example";

test('renders hello world', () => {
  render(<Example />)
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});