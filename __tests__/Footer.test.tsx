import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/src/components/Footer';

describe('Footer', () => {
  it('renders svg RSS-logo in Footer', () => {
    render(<Footer />);

    const title = screen.getByTitle('rs_school_js');

    expect(title).toBeInTheDocument();
  });

  it('renders a team member name in Footer', () => {
    render(<Footer />);

    const name = screen.getByText('Tanya');

    expect(name).toBeInTheDocument();
  });

  it('renders a team member name in Footer', () => {
    render(<Footer />);

    const name = screen.getByText('Kirill');

    expect(name).toBeInTheDocument();
  });

  it('renders a team member name in Footer', () => {
    render(<Footer />);

    const name = screen.getByText('Denis');

    expect(name).toBeInTheDocument();
  });

  it('renders a team member link in Footer', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: 'Tanya' });

    expect(link).toBeInTheDocument();
  });

  it('renders a team member link in Footer', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: 'Kirill' });

    expect(link).toBeInTheDocument();
  });

  it('renders a team member link in Footer', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: 'Denis' });

    expect(link).toBeInTheDocument();
  });
});
