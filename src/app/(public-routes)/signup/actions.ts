'use server';

import {
  SignupActionResponse,
  SignupErrorResponse,
  SignupSuccessResponse,
} from '@/@types/response/response-sign-up';
import { SignupRequest } from '@/@types/request/request-sign-up';

export async function signupAction(
  formData: FormData,
): Promise<SignupActionResponse> {
  try {
    const raw = Object.fromEntries(formData.entries());

    const payload: SignupRequest = {
      user: {
        name: raw.name as string,
        email: raw.email as string,
        password: raw.password as string,
        password_confirmation: raw.passwordConfirmation as string,
        address_attributes: {
          zip_code: raw.cep as string,
          city: raw.city as string,
          state: raw.state as string,
        },
      },
    };

    const res = await fetch('http://localhost:3001/api/user-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error: SignupErrorResponse = await res.json();
      const errorMessage = Object.entries(error.error)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');

      return { success: false, message: errorMessage };
    }

    const data: SignupSuccessResponse = await res.json();

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error('Erro inesperado:', error);
    return { success: false, message: 'Erro desconhecido' };
  }
}
