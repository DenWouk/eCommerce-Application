import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/src/components/Header';

describe('Header', () => {
  it('renders a page navigation link in Header', () => {
    render(<Header authorized={undefined} />);

    const name = screen.getByRole('link', { name: 'Main' });

    expect(name).toBeInTheDocument();
  });

  it('renders a page navigation link in Header', () => {
    render(<Header authorized={undefined} />);

    const name = screen.getByRole('link', { name: 'Cars' });

    expect(name).toBeInTheDocument();
  });

  it('renders a page navigation link in Header', () => {
    render(<Header authorized={undefined} />);

    const name = screen.getByRole('link', { name: 'About us' });

    expect(name).toBeInTheDocument();
  });

  it('not renders a page navigation link in Header', () => {
    render(<Header authorized={undefined} />);

    const name = screen.queryByRole('link', { name: 'Contacts' });

    expect(name).toBeNull();
  });
});
