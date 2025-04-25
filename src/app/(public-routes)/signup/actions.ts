'use server';

import { z } from 'zod';

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
    cep: z.string().min(8),
    city: z.string().min(2),
    state: z.string().min(2),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não coincidem',
    path: ['passwordConfirmation'],
  });

export async function signupAction(
  formData: FormData,
): Promise<{ success: boolean; message?: string }> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse(raw);

  if (!parsed.success) {
    console.error('Erros de validação:', parsed.error.flatten().fieldErrors);
    return { success: false, message: 'Erro de validação dos campos' };
  }

  const payload = {
    user: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      password_confirmation: parsed.data.passwordConfirmation,
      address_attributes: {
        zip_code: parsed.data.cep,
        city: parsed.data.city,
        state: parsed.data.state,
      },
    },
  };

  const res = await fetch('http://localhost:3080/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    console.log('>>>', data);
    const errorMessage =
      data.message ||
      (Array.isArray(data.errors)
        ? data.errors.join(', ')
        : 'Erro desconhecido');

    console.error('Erro no backend:', errorMessage);
    return { success: false, message: errorMessage };
  }

  return { success: true };
}
