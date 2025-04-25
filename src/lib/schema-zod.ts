import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
    cep: z.string().min(8, 'CEP inválido'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não coincidem',
    path: ['passwordConfirmation'],
  });

export const signinSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});
