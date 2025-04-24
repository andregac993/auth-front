'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordConfirmation: z.string().min(6),
    cep: z.string().min(8, 'CEP inválido'),
    city: z.string().min(2, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    console.log('Signup data:', data);
    // Aqui você chama sua API: POST /signup
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-16 flex max-w-sm flex-col gap-4"
    >
      <h1 className="text-center text-2xl font-semibold">Criar conta</h1>

      <input
        placeholder="Nome"
        type="text"
        {...register('name')}
        className="input border-2 border-gray-300"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        placeholder="E-mail"
        type="email"
        {...register('email')}
        className="input border-2 border-gray-300"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        placeholder="Senha"
        type="password"
        {...register('password')}
        className="input border-2 border-gray-300"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <input
        placeholder="Confirmar senha"
        type="password"
        {...register('passwordConfirmation')}
        className="input border-2 border-gray-300"
      />
      {errors.passwordConfirmation && (
        <p className="text-red-500">{errors.passwordConfirmation.message}</p>
      )}

      <input
        placeholder="CEP"
        type="text"
        {...register('cep')}
        className="input border-2 border-gray-300"
      />
      {errors.cep && <p className="text-red-500">{errors.cep.message}</p>}

      <input
        placeholder="Cidade"
        type="text"
        {...register('city')}
        className="input border-2 border-gray-300"
      />
      {errors.city && <p className="text-red-500">{errors.city.message}</p>}

      <input
        placeholder="Estado"
        type="text"
        {...register('state')}
        className="input border-2 border-gray-300"
      />
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}

      <button
        type="submit"
        className="rounded bg-black py-2 text-white hover:bg-gray-800"
      >
        Cadastrar
      </button>
    </form>
  );
}
