import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SeniorCare+ dashboard', () => {
  render(<App />);
  const headingElement = screen.getByText(/SeniorCare\+/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders navigation sidebar', () => {
  render(<App />);
  const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
  expect(dashboardLink).toBeInTheDocument();
});

test('renders cognitive report link', () => {
  render(<App />);
  const reportLink = screen.getByRole('link', { name: /Cognitive Report/i });
  expect(reportLink).toBeInTheDocument();
});

test('renders AI analysis link', () => {
  render(<App />);
  const aiLink = screen.getByRole('link', { name: /AI Analysis/i });
  expect(aiLink).toBeInTheDocument();
});

test('renders contact elderly link', () => {
  render(<App />);
  const chatLink = screen.getByRole('link', { name: /Contact Elderly/i });
  expect(chatLink).toBeInTheDocument();
});
