import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninResponse } from '@/@types/response/response-sign-in';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { z } from 'zod';
import { signinSchema } from '@/lib/schema-zod';

type SigninData = z.infer<typeof signinSchema>;

export function UseSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user-login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: SigninResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro de autenticação');
      }

      if (result.success) {
        showSuccessToast(
          'Login realizado com sucesso!',
          'Você será redirecionado.',
        );
        router.push('/profile');
      } else {
        showErrorToast(
          'Erro ao fazer login',
          result.message || 'Tente novamente mais tarde',
        );
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Erro no onSubmit:', err);
      showErrorToast(
        'Erro inesperado',
        err.message || 'Tente novamente mais tarde',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    form,
    showPassword,
    setShowPassword,
    isLoading,
  };
}
