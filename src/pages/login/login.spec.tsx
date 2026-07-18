import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoginPage from './login';

describe('LoginPage', () => {
  it('should render username', () => {
    render(<LoginPage />);

    // getBy -> throws an error
    // queryBy -> null
    // findBy -> Async

    expect(screen.getByText('Username')).toBeInTheDocument();
  });
});
