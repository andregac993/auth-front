import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '@/app/(public-routes)/signup/page';
import '@testing-library/jest-dom';

jest.mock('@/app/(public-routes)/signup/actions', () => ({
  signupAction: jest.fn(),
}));

jest.mock('@/lib/toast', () => ({
  showSuccessToast: jest.fn(),
  showErrorToast: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
}));

const mockSignupAction =
  require('@/app/(public-routes)/signup/actions').signupAction;
const mockShowSuccessToast = require('@/lib/toast').showSuccessToast;
const mockShowErrorToast = require('@/lib/toast').showErrorToast;
const mockRedirect = require('next/navigation').redirect;

describe('SignupPage', () => {
  beforeEach(() => {
    // Resetando mocks antes de cada teste
    mockSignupAction.mockReset();
    mockShowSuccessToast.mockReset();
    mockShowErrorToast.mockReset();
    mockRedirect.mockReset();
  });

  it('envia o formulário corretamente e exibe o toast de sucesso', async () => {
    mockSignupAction.mockResolvedValue({ success: true });

    render(<SignupPage />);

    fireEvent.change(screen.getByTestId(/name/i), {
      target: { value: 'André' },
    });

    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: 'andre@example.com' },
    });

    fireEvent.change(screen.getByTestId(/password-input/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByTestId(/confirm-password/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByTestId(/cep/i), {
      target: { value: '72547204' },
    });

    fireEvent.change(screen.getByTestId(/city/i), {
      target: { value: 'Brasília' },
    });

    fireEvent.change(screen.getByTestId(/state/i), {
      target: { value: 'DF' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer user-login.',
      );
      expect(mockRedirect).toHaveBeenCalledWith('/login');
    });
  });

  it('exibe toast de erro quando o cadastro falha', async () => {
    mockSignupAction.mockResolvedValue({
      success: false,
      message: 'Email já usado',
    });

    render(<SignupPage />);

    fireEvent.change(screen.getByTestId(/name/i), {
      target: { value: 'André' },
    });

    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: 'andre@example.com' },
    });

    fireEvent.change(screen.getByTestId(/password-input/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByTestId(/confirm-password/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByTestId(/cep/i), {
      target: { value: '72547204' },
    });

    fireEvent.change(screen.getByTestId(/city/i), {
      target: { value: 'Brasília' },
    });

    fireEvent.change(screen.getByTestId(/state/i), {
      target: { value: 'DF' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalled();
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Erro ao criar usuário',
        'Email já usado',
      );
    });
  });
});
