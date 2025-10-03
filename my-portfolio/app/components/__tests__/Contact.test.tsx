import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';
import emailjs from '@emailjs/browser';

jest.mock('@emailjs/browser');

describe('Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('ouvre le formulaire quand on clique sur "Me Contacter"', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /Me Contacter/i }));
    expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument();
  });

  test('ferme le formulaire quand on clique sur "Annuler"', async () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /Me Contacter/i }));
    fireEvent.click(screen.getByRole('button', { name: /Annuler/i }));

    await waitFor(() => {
      expect(screen.getByTestId('contact-form-wrapper')).not.toHaveClass('open');
    });
  });

  test('affiche le spinner pendant l\'envoi', async () => {
    (emailjs.send as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /Me Contacter/i }));
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'alice@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre message/i), { target: { value: 'Bonjour' } });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('affiche le message de succès après envoi', async () => {
    (emailjs.send as jest.Mock).mockResolvedValue({});

    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /Me Contacter/i }));
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'alice@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre message/i), { target: { value: 'Bonjour' } });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes('Votre message a été envoyé avec succès')
        )
      ).toBeInTheDocument();
    });
  });

  test('affiche le message d\'erreur si l\'envoi échoue', async () => {
    (emailjs.send as jest.Mock).mockRejectedValue(new Error('Fail'));

    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /Me Contacter/i }));
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'alice@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre message/i), { target: { value: 'Bonjour' } });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes('Une erreur est survenue'))
      ).toBeInTheDocument();
    });
  });
});
