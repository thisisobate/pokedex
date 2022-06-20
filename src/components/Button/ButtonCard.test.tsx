import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ButtonCard } from './ButtonCard';


describe('ButttonCard', () => {
  it('should execute callback when clicked', () => {
    const callback = jest.fn();
    render(
        <ButtonCard onClick={callback} name="Test Heading" />
    );
    fireEvent.click(screen.getByText('Test Heading'));
    expect(callback).toBeCalledTimes(1);
  });
});