export interface ProfileUserResponse {
  name: string;
  email: string;
  address_attributes: {
    zip_code: string;
    city: string;
    state: string;
  };
}
