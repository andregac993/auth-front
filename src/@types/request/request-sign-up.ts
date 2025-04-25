export interface SignupRequest {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    address_attributes: {
      zip_code: string;
      city: string;
      state: string;
    };
  };
}
