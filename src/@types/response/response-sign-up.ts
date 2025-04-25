export interface SignupSuccessResponse {
  user: {
    id: number;
    email: string;
  };
  message: string;
}
export interface SignupErrorResponse {
  error: Record<string, string>;
}

export interface SignupActionResponse {
  success: boolean;
  message?: string;
}
