import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SigninPage from '@/app/(public-routes)/login/page';
import '@testing-library/jest-dom';

jest.mock('@/lib/toast', () => ({
  showSuccessToast: jest.fn(),
  showErrorToast: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockShowSuccessToast = require('@/lib/toast').showSuccessToast;
const mockShowErrorToast = require('@/lib/toast').showErrorToast;

describe('SigninPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('envia o formulário corretamente e redireciona após sucesso', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<SigninPage />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'andre@example.com' },
    });

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/user-login',
        expect.any(Object),
      );
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Login realizado com sucesso!',
        'Você será redirecionado.',
      );
    });
  });

  it('exibe toast de erro quando o login falha', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Credenciais inválidas' }),
    });

    render(<SigninPage />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'andre@example.com' },
    });

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'senhaerrada' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Erro inesperado',
        'Credenciais inválidas',
      );
    });
  });
});
