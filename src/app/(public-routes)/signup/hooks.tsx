'use client';
import { z } from 'zod';
import { signupSchema } from '@/lib/schema-zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupAction } from '@/app/(public-routes)/signup/actions';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { redirect } from 'next/navigation';

type SignupData = z.infer<typeof signupSchema>;

export function UseSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      cep: '',
      city: '',
      state: '',
    },
  });

  const onSubmit = async (data: SignupData) => {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await signupAction(formData);
    if (!result.success) {
      showErrorToast('Erro ao criar usuário', result.message);
    } else {
      showSuccessToast(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer user-login.',
      );
      form.reset();
      redirect('/login');
    }
    setIsLoading(false);
  };

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          form.setValue('city', data.localidade);
          form.setValue('state', data.uf);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };
  return {
    form,
    isLoading,
    setIsLoading,
    setShowPassword,
    showPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
    fetchAddressByCep,
  };
}
