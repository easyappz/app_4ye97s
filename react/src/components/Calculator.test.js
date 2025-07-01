import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  // Snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<Calculator />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Rendering test
  it('renders all buttons and display correctly', () => {
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('±')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('●')).toBeInTheDocument();
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Basic arithmetic operations tests
  it('performs addition correctly', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('performs subtraction correctly', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('−'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('performs multiplication correctly', () => {
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('performs division correctly', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  // Decimal input test
  it('handles decimal inputs correctly', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('●'));
    fireEvent.click(screen.getByText('5'));
    expect(screen.getByText('2.5')).toBeInTheDocument();
  });

  // Clear function test
  it('clears the display when C button is pressed', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Plus/minus toggle test
  it('toggles plus/minus correctly', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('±'));
    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  // Percentage calculation test
  it('calculates percentage correctly', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('%'));
    expect(screen.getByText('0.5')).toBeInTheDocument();
  });

  // Edge case: dividing by zero
  it('handles division by zero', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('Infinity')).toBeInTheDocument();
  });

  // Edge case: long number inputs
  it('handles long number inputs', () => {
    for (let i = 1; i <= 9; i++) {
      fireEvent.click(screen.getByText(i.toString()));
    }
    expect(screen.getByText('123456789')).toBeInTheDocument();
  });

  // Chaining multiple operations
  it('handles chaining multiple operations', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  // Responsive layout test
  it('maintains layout at different screen sizes', () => {
    const { container } = render(<Calculator />);
    expect(container.firstChild).toHaveClass('calculator');
    // Note: Further responsiveness tests would typically involve
    // checking specific CSS properties or using a library like
    // 'jest-styled-components' for more detailed responsive checks.
  });
});
