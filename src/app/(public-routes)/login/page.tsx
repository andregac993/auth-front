'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    console.log('Login data:', data);
    // Aqui você irá chamar sua API: /login
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-16 flex max-w-sm flex-col gap-4"
    >
      <h1 className="text-center text-2xl font-semibold">Login</h1>
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

      <button
        type="submit"
        className="rounded bg-black py-2 text-white hover:bg-gray-800"
      >
        Entrar
      </button>
    </form>
  );
}
